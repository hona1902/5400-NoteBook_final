from typing import List, Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from loguru import logger

from api.auth import CurrentUser, get_current_user, require_admin
from api.models import FeedbackCreate, FeedbackResponse
from open_notebook.domain.notebook import Feedback

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
async def create_feedback(
    data: FeedbackCreate,
    user: CurrentUser = Depends(get_current_user),
):
    """Create a feedback entry (like, dislike, or report)."""
    try:
        if data.feedback_type == "report" and not data.report_content:
            raise HTTPException(
                status_code=400, detail="Report content is required for report type"
            )

        feedback = Feedback(
            feedback_type=data.feedback_type,
            question=data.question,
            answer=data.answer,
            report_content=data.report_content,
            user_id=user.id,
        )
        await feedback.save()

        return FeedbackResponse(
            id=feedback.id or "",
            feedback_type=feedback.feedback_type,
            question=feedback.question,
            answer=feedback.answer,
            report_content=feedback.report_content,
            user_id=str(feedback.user_id) if feedback.user_id else None,
            username=user.username if hasattr(user, "username") else None,
            created=str(feedback.created),
            updated=str(feedback.updated),
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating feedback: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating feedback: {str(e)}")


@router.get("/feedback", response_model=List[FeedbackResponse])
async def get_feedback(
    feedback_type: Optional[Literal["like", "dislike", "report"]] = Query(
        None, description="Filter by feedback type"
    ),
    date_from: Optional[str] = Query(None, description="Filter from date (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="Filter to date (YYYY-MM-DD)"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    _admin: CurrentUser = Depends(require_admin),
):
    """Get all feedback entries (admin only) with optional filters."""
    try:
        from open_notebook.database.repository import repo_query

        # Build query with filters
        conditions = []
        params = {}

        if feedback_type:
            conditions.append("feedback_type = $feedback_type")
            params["feedback_type"] = feedback_type

        if date_from:
            conditions.append("created >= $date_from")
            params["date_from"] = f"{date_from}T00:00:00Z"

        if date_to:
            conditions.append("created <= $date_to")
            params["date_to"] = f"{date_to}T23:59:59Z"

        where_clause = " AND ".join(conditions) if conditions else ""
        # Use FETCH to resolve user_id in a single query
        query = "SELECT *, user_id.username as username FROM feedback"
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " ORDER BY created DESC"

        # Pagination
        offset = (page - 1) * page_size
        query += f" LIMIT {page_size} START {offset}"

        result = await repo_query(query, params if params else None)

        feedback_list = []
        for row in result:
            uid = row.get("user_id")
            # username is resolved via user_id.username in the SELECT
            username = row.get("username")

            feedback_list.append(
                FeedbackResponse(
                    id=str(row.get("id", "")),
                    feedback_type=row.get("feedback_type", ""),
                    question=row.get("question", ""),
                    answer=row.get("answer", ""),
                    report_content=row.get("report_content"),
                    user_id=str(uid) if uid else None,
                    username=username,
                    created=str(row.get("created", "")),
                    updated=str(row.get("updated", "")),
                )
            )

        return feedback_list
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching feedback: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error fetching feedback: {str(e)}"
        )
