import sys
sys.path.append("d:/Project Web/5400-NoteBook_final")

from api.main import app

for route in app.routes:
    if hasattr(route, "methods"):
        print(f"{route.methods} {route.path}")
