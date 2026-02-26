'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'
import {
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    Cloud,
    Server,
    Building2,
    Puzzle,
    Compass,
    Footprints,
    BookOpen,
    AlertTriangle,
    ExternalLink,
} from 'lucide-react'

// =============================================================================
// Collapsible Section Component
// =============================================================================

function Section({
    title,
    icon,
    children,
    defaultOpen = false,
    badge,
}: {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
    badge?: string
}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <Card>
            <CardHeader
                className="cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon}
                        <CardTitle className="text-lg">{title}</CardTitle>
                        {badge && (
                            <Badge variant="secondary" className="text-xs">
                                {badge}
                            </Badge>
                        )}
                    </div>
                    {open ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
            </CardHeader>
            {open && <CardContent>{children}</CardContent>}
        </Card>
    )
}

// =============================================================================
// Provider Detail Block
// =============================================================================

function ProviderBlock({
    name,
    cost,
    steps,
    models,
    recommended,
    costEstimate,
    advantages,
    disadvantages,
    troubleshooting,
    hardwareRequirements,
    labels,
}: {
    name: string
    cost: string
    steps: string[]
    models?: string[]
    recommended?: string[]
    costEstimate?: string[]
    advantages?: string[]
    disadvantages?: string[]
    troubleshooting?: string[]
    hardwareRequirements?: string[]
    labels?: {
        setupSteps: string
        models: string
        recommended: string
        costEstimate: string
        hardwareReq: string
        advantages: string
        disadvantages: string
        troubleshooting: string
    }
}) {
    const l = labels ?? {
        setupSteps: 'Setup Steps:',
        models: 'Models:',
        recommended: 'Recommended:',
        costEstimate: 'Cost Estimate:',
        hardwareReq: 'Hardware Requirements:',
        advantages: 'Advantages:',
        disadvantages: 'Disadvantages:',
        troubleshooting: 'Troubleshooting:',
    }
    return (
        <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base">{name}</h4>
                <Badge variant="outline" className="text-xs">
                    {cost}
                </Badge>
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{l.setupSteps}</p>
                <ol className="list-decimal list-inside text-sm space-y-0.5 pl-2">
                    {steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </div>

            {models && models.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{l.models}</p>
                    <div className="flex flex-wrap gap-1">
                        {models.map((model, i) => (
                            <Badge key={i} variant="secondary" className="text-xs font-mono">
                                {model}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {recommended && recommended.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{l.recommended}</p>
                    <ul className="list-disc list-inside text-sm space-y-0.5 pl-2">
                        {recommended.map((rec, i) => (
                            <li key={i}>{rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {costEstimate && costEstimate.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{l.costEstimate}</p>
                    <div className="bg-muted/50 rounded p-2 text-xs font-mono space-y-0.5">
                        {costEstimate.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                </div>
            )}

            {hardwareRequirements && hardwareRequirements.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{l.hardwareReq}</p>
                    <div className="bg-muted/50 rounded p-2 text-xs font-mono space-y-0.5">
                        {hardwareRequirements.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                </div>
            )}

            {advantages && advantages.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{l.advantages}</p>
                    <ul className="list-disc list-inside text-sm space-y-0.5 pl-2">
                        {advantages.map((adv, i) => (
                            <li key={i}>{adv}</li>
                        ))}
                    </ul>
                </div>
            )}

            {disadvantages && disadvantages.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">{l.disadvantages}</p>
                    <ul className="list-disc list-inside text-sm space-y-0.5 pl-2">
                        {disadvantages.map((dis, i) => (
                            <li key={i}>{dis}</li>
                        ))}
                    </ul>
                </div>
            )}

            {troubleshooting && troubleshooting.length > 0 && (
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{l.troubleshooting}</p>
                    <ul className="list-disc list-inside text-sm space-y-0.5 pl-2">
                        {troubleshooting.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

// =============================================================================
// Main Page
// =============================================================================

export default function AiProvidersPage() {
    const { t, i18n } = useTranslation()
    const p = t.aiProviders

    // Use i18n.t() directly with returnObjects to bypass the Proxy depth limit.
    // The Proxy-based t.aiProviders.cloudProviders fails because .map() cannot
    // be resolved at depth 3+ of the Proxy's get trap.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = (key: string) => i18n.t(`aiProviders.${key}`, { returnObjects: true }) as any

    const providerLabels = {
        setupSteps: String(raw('labelSetupSteps') ?? 'Setup Steps:'),
        models: String(raw('labelModels') ?? 'Models:'),
        recommended: String(raw('labelRecommended') ?? 'Recommended:'),
        costEstimate: String(raw('labelCostEstimate') ?? 'Cost Estimate:'),
        hardwareReq: String(raw('labelHardwareReq') ?? 'Hardware Requirements:'),
        advantages: String(raw('labelAdvantages') ?? 'Advantages:'),
        disadvantages: String(raw('labelDisadvantages') ?? 'Disadvantages:'),
        troubleshooting: String(raw('labelTroubleshooting') ?? 'Troubleshooting:'),
    }

    const howItWorksSteps: string[] = raw('howItWorksSteps') ?? []
    const cloudProviders = (raw('cloudProviders') ?? []) as { name: string; cost: string; steps: string[]; models?: string[]; recommended?: string[]; costEstimate?: string[]; advantages?: string[]; disadvantages?: string[]; troubleshooting?: string[] }[]
    const selfHostedProviders = (raw('selfHostedProviders') ?? []) as { name: string; cost: string; steps: string[]; models?: string[]; recommended?: string[]; advantages?: string[]; disadvantages?: string[]; troubleshooting?: string[]; hardwareRequirements?: string[] }[]
    const enterpriseProviders = (raw('enterpriseProviders') ?? []) as { name: string; cost: string; steps: string[]; advantages?: string[]; disadvantages?: string[] }[]
    const choosingOptions = (raw('choosingOptions') ?? []) as { label: string; providers: string; desc: string }[]
    const nextSteps: string[] = raw('nextSteps') ?? []
    const relatedLinks = (raw('relatedLinks') ?? []) as { label: string; desc: string }[]

    return (
        <AppShell>
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6 max-w-4xl mx-auto">
                    {/* Header */}
                    <div>
                        <Link href="/settings/api-keys">
                            <Button variant="ghost" size="sm" className="gap-1 mb-2 -ml-2">
                                <ArrowLeft className="h-4 w-4" />
                                {p.backToApiKeys}
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            {p.pageTitle}
                        </h1>
                        <p className="text-muted-foreground mt-1">{p.pageDesc}</p>
                    </div>

                    {/* Note banner */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-4 text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-200">{p.newInV12}</p>
                    </div>

                    {/* How it works */}
                    <Section
                        title={p.howItWorksTitle}
                        icon={<Compass className="h-5 w-5" />}
                        defaultOpen
                    >
                        <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
                            {howItWorksSteps.map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3 text-sm">
                            <p className="text-amber-800 dark:text-amber-200">{p.prerequisite}</p>
                        </div>
                    </Section>

                    {/* Cloud Providers */}
                    <Section
                        title={p.cloudProvidersTitle}
                        icon={<Cloud className="h-5 w-5" />}
                        badge={p.recommendedBadge}
                        defaultOpen
                    >
                        <div className="space-y-4">
                            {cloudProviders.map((provider, i: number) => (
                                <ProviderBlock key={i} {...provider} labels={providerLabels} />
                            ))}
                        </div>
                    </Section>

                    {/* Self-Hosted / Local */}
                    <Section
                        title={p.selfHostedTitle}
                        icon={<Server className="h-5 w-5" />}
                        defaultOpen
                    >
                        <div className="space-y-4">
                            {selfHostedProviders.map((provider, i: number) => (
                                <ProviderBlock key={i} {...provider} labels={providerLabels} />
                            ))}
                        </div>
                    </Section>

                    {/* Enterprise */}
                    <Section
                        title={p.enterpriseTitle}
                        icon={<Building2 className="h-5 w-5" />}
                        defaultOpen
                    >
                        <div className="space-y-4">
                            {enterpriseProviders.map((provider, i: number) => (
                                <ProviderBlock key={i} {...provider} labels={providerLabels} />
                            ))}
                        </div>
                    </Section>

                    {/* Embeddings */}
                    <Section
                        title={p.embeddingsTitle}
                        icon={<Puzzle className="h-5 w-5" />}
                        defaultOpen
                    >
                        <p className="text-sm">{p.embeddingsDesc}</p>
                    </Section>

                    {/* Choosing Your Provider */}
                    <Section
                        title={p.choosingTitle}
                        icon={<Compass className="h-5 w-5" />}
                        defaultOpen
                    >
                        <div className="space-y-3">
                            {choosingOptions.map((option, i: number) => (
                                <div key={i} className="border rounded-lg p-3">
                                    <p className="font-medium text-sm">{option.label}</p>
                                    <p className="text-sm text-primary">{option.providers}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Next Steps */}
                    <Section
                        title={p.nextStepsTitle}
                        icon={<Footprints className="h-5 w-5" />}
                        defaultOpen
                    >
                        <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
                            {nextSteps.map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm">
                            <p className="text-blue-800 dark:text-blue-200">{p.multipleProvidersNote}</p>
                        </div>
                    </Section>

                    {/* Legacy: Environment Variables */}
                    <Section
                        title={p.legacyTitle}
                        icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                        badge={p.legacyDeprecated}
                        defaultOpen
                    >
                        <div className="space-y-3">
                            <div className="rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30 p-3 text-sm">
                                <p className="text-orange-800 dark:text-orange-200">{p.legacyDesc}</p>
                            </div>
                            <p className="text-sm">{p.legacyMigration}</p>
                        </div>
                    </Section>

                    {/* Related Documentation */}
                    <Section
                        title={p.relatedTitle}
                        icon={<ExternalLink className="h-5 w-5" />}
                        defaultOpen
                    >
                        <div className="space-y-2">
                            {relatedLinks.map((link, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-muted-foreground mt-0.5">•</span>
                                    <div>
                                        <span className="font-medium">{link.label}</span>
                                        <span className="text-muted-foreground"> — {link.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Back link */}
                    <div className="border-t pt-4">
                        <Link href="/settings/api-keys">
                            <Button variant="ghost" size="sm" className="gap-1 -ml-2">
                                <ArrowLeft className="h-4 w-4" />
                                {p.backToApiKeys}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}

