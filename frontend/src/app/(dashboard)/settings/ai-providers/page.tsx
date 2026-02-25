'use client'

import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'

export default function AiProvidersDocsPage() {
    const { t } = useTranslation()
    const d = t.aiProvidersDoc

    return (
        <AppShell>
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <Button variant="ghost" size="sm" asChild className="gap-1 mb-4 -ml-2">
                            <Link href="/settings/api-keys">
                                <ChevronLeft className="h-4 w-4" />
                                {d.backToApiKeys}
                            </Link>
                        </Button>

                        <h1 className="text-3xl font-bold">{d.title}</h1>
                        <p className="text-muted-foreground mt-2">{d.subtitle}</p>
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md text-sm text-blue-800 dark:text-blue-300">
                            <strong>{d.newInV12}:</strong> {d.newInV12Desc}
                        </div>
                    </div>

                    {/* How it works */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3">{d.howItWorks}</h2>
                        <p className="text-muted-foreground text-sm mb-3">{d.howItWorksDesc}</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            <li>{d.step1}</li>
                            <li>{d.step2}</li>
                            <li>{d.step3}</li>
                            <li>{d.step4}</li>
                            <li>{d.step5}</li>
                        </ol>
                        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md text-sm text-yellow-800 dark:text-yellow-300">
                            <strong>{d.prerequisite}:</strong> {d.prerequisiteDesc}
                        </div>
                    </section>

                    <hr />

                    {/* Cloud Providers */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">{d.cloudProviders}</h2>
                        <div className="space-y-6">

                            {/* OpenAI */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_openai}</h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.openai_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.getApiKey}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                platform.openai.com/api-keys <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>Create account (if needed)</li>
                                        <li>Create new API key (starts with &quot;sk-proj-&quot;)</li>
                                        <li>Add $5+ credits to account</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.recommendedModels}:</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li><code className="bg-muted px-1 rounded">gpt-4o</code> — Best quality, fast</li>
                                        <li><code className="bg-muted px-1 rounded">gpt-4o-mini</code> — Fast, cheap, good for testing</li>
                                        <li><code className="bg-muted px-1 rounded">o1</code> — Advanced reasoning</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.openai_adv}</p>
                            </div>

                            {/* Anthropic */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_anthropic}</h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.anthropic_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.getApiKey}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                console.anthropic.com <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>Create account or login</li>
                                        <li>Create new API key (starts with &quot;sk-ant-&quot;)</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.recommendedModels}:</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li><code className="bg-muted px-1 rounded">claude-sonnet-4-5-20250929</code> — Latest, best quality</li>
                                        <li><code className="bg-muted px-1 rounded">claude-3-5-haiku-20241022</code> — Fast, cheap</li>
                                        <li><code className="bg-muted px-1 rounded">claude-opus-4-5-20251101</code> — Most powerful</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.anthropic_adv}</p>
                            </div>

                            {/* Google Gemini */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_gemini}</h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.gemini_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.getApiKey}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                aistudio.google.com/app/apikey <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>Create account or login &amp; create new API key</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.recommendedModels}:</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li><code className="bg-muted px-1 rounded">gemini-2.0-flash-exp</code> — Latest, fastest (recommended)</li>
                                        <li><code className="bg-muted px-1 rounded">gemini-2.0-flash</code> — Stable, fast, cheap</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.gemini_adv}</p>
                            </div>

                            {/* Groq */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_groq}</h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.groq_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.getApiKey}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                console.groq.com/keys <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>Create account or login &amp; create new API key</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.recommendedModels}:</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li><code className="bg-muted px-1 rounded">llama-3.3-70b-versatile</code> — Best on Groq</li>
                                        <li><code className="bg-muted px-1 rounded">gemma2-9b-it</code> — Ultra-fast</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.groq_adv}</p>
                            </div>

                            {/* OpenRouter */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_openrouter}</h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.openrouter_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.getApiKey}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                openrouter.ai/keys <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>Create account or login &amp; add credits</li>
                                        <li>Create new API key (starts with &quot;sk-or-&quot;)</li>
                                    </ol>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.openrouter_adv}</p>
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* Self-hosted / Local */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">{d.selfHosted}</h2>
                        <div className="space-y-6">

                            {/* Ollama */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    {d.provider_ollama_title}{' '}
                                    <span className="text-sm font-normal text-muted-foreground">({d.provider_ollama_label})</span>
                                </h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.ollama_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.ollama_setup}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            Install Ollama:{' '}
                                            <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                ollama.ai <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>{d.ollama_serve}</li>
                                        <li>{d.ollama_pull}</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.ollama_baseurl}</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li>{d.ollama_local}</li>
                                        <li>{d.ollama_dockerhost}</li>
                                        <li>{d.ollama_dockercontainer}</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.recommendedModels}:</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li><code className="bg-muted px-1 rounded">llama3.1:8b</code> — Recommended, balanced (8GB RAM)</li>
                                        <li><code className="bg-muted px-1 rounded">qwen2.5:7b</code> — Excellent for code and reasoning</li>
                                        <li><code className="bg-muted px-1 rounded">phi3:3.8b</code> — Small, very fast (4GB RAM)</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.ollama_adv}</p>
                            </div>

                            {/* LM Studio */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    {d.provider_lmstudio_title}{' '}
                                    <span className="text-sm font-normal text-muted-foreground">({d.provider_lmstudio_label})</span>
                                </h3>
                                <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.lmstudio_cost}</p>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.lmstudio_setup}</p>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                        <li>
                                            Download:{' '}
                                            <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                                                lmstudio.ai <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </li>
                                        <li>{d.lmstudio_openAndModel}</li>
                                        <li>{d.lmstudio_server}</li>
                                    </ol>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">{d.lmstudio_configInApp}</p>
                                    <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                                        <li>{d.lmstudio_provider}</li>
                                        <li>{d.lmstudio_url}</li>
                                        <li>{d.lmstudio_key}</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.lmstudio_adv}</p>
                            </div>

                            {/* Custom OpenAI-Compatible */}
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-semibold">{d.provider_custom}</h3>
                                <p className="text-sm text-muted-foreground">{d.custom_desc}</p>
                                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                    <li>{d.custom_step1}</li>
                                    <li>{d.custom_step2}</li>
                                    <li>{d.custom_step3}</li>
                                    <li>{d.custom_step4}</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* Enterprise */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">{d.enterprise}</h2>
                        <div className="border rounded-lg p-4 space-y-3">
                            <h3 className="text-lg font-semibold">{d.provider_azure}</h3>
                            <p className="text-sm text-muted-foreground"><strong>{d.cost}:</strong> {d.azure_cost}</p>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5">
                                <li>Create Azure OpenAI service in Azure portal</li>
                                <li>Deploy GPT-4/3.5-turbo model</li>
                                <li>Get your endpoint and key</li>
                                <li>Select provider: <strong>Azure OpenAI</strong></li>
                                <li>Fill in: API Key, Endpoint, API Version</li>
                                <li>Click Save, then Test Connection</li>
                            </ol>
                            <p className="text-xs text-muted-foreground"><strong>{d.advantages}:</strong> {d.azure_adv}</p>
                        </div>
                    </section>

                    <hr />

                    {/* Embeddings */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3">{d.embeddings}</h2>
                        <p className="text-sm text-muted-foreground">{d.embeddingsDesc}</p>
                    </section>

                    <hr />

                    {/* Choosing Your Provider */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">{d.whichProvider}</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="border rounded-lg p-3">
                                <p className="font-medium text-sm">{d.option_simple}</p>
                                <p className="text-xs text-muted-foreground mt-1">{d.option_simple_desc}</p>
                            </div>
                            <div className="border rounded-lg p-3">
                                <p className="font-medium text-sm">{d.option_budget}</p>
                                <p className="text-xs text-muted-foreground mt-1">{d.option_budget_desc}</p>
                            </div>
                            <div className="border rounded-lg p-3">
                                <p className="font-medium text-sm">{d.option_privacy}</p>
                                <p className="text-xs text-muted-foreground mt-1">{d.option_privacy_desc}</p>
                            </div>
                            <div className="border rounded-lg p-3">
                                <p className="font-medium text-sm">{d.option_enterprise}</p>
                                <p className="text-xs text-muted-foreground mt-1">{d.option_enterprise_desc}</p>
                            </div>
                        </div>
                    </section>

                    <hr />

                    {/* Next Steps */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3">{d.nextSteps}</h2>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            <li>{d.nextStep1}</li>
                            <li>{d.nextStep2}</li>
                            <li>{d.nextStep3}</li>
                            <li>{d.nextStep4}</li>
                            <li>{d.nextStep5}</li>
                            <li>{d.nextStep6}</li>
                            <li>{d.nextStep7}</li>
                        </ol>
                        <p className="text-xs text-muted-foreground mt-3">{d.nextStepsTip}</p>
                    </section>

                    <hr />

                    {/* Legacy */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3">{d.legacyTitle}</h2>
                        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-md text-sm text-orange-800 dark:text-orange-300">
                            {d.legacyWarning}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">{d.legacyDesc}</p>
                    </section>

                    {/* Footer */}
                    <div className="border-t pt-4 text-center">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/settings/api-keys">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                {d.goToApiKeys}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
