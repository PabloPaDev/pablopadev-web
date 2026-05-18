import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitPullRequest } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	type ProjectEntry,
	projects,
	projectsIntroAfter,
	projectsIntroBefore,
	projectsIntroHighlight,
	projectsSectionTitle,
} from "@/data/cv"

function projectVisitLabel({ title, visitLabel }: ProjectEntry): string {
	if (visitLabel) return visitLabel
	return title.replace(/^Web\s+/i, "").trim()
}

export default function OpenSource() {
	return (
		<div id="projects">
			<div className="space-y-12">
				<div className="space-y-4 text-center">
					<h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">{projectsSectionTitle}</h3>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
						{projectsIntroBefore}{" "}
						<span className="text-foreground font-medium">{projectsIntroHighlight}</span>
						{projectsIntroAfter}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-3">
					{projects.map((contribution) => (
						<div key={contribution.title}>
							<Card
								className={cn(
									"h-full flex flex-col",
									contribution.ownProject &&
										"border-2 border-primary shadow-md ring-1 ring-primary/20"
								)}
							>
								<CardContent className="p-6 flex-1 flex flex-col">
									<div className="mb-4 flex flex-wrap items-center gap-2">
										<GitPullRequest className="h-8 w-8 text-primary" />
										{contribution.ownProject ? (
											<Badge variant="default" className="font-semibold">
												Proyecto propio
											</Badge>
										) : null}
										{contribution.inProgress ? (
											<Badge variant="secondary" className="font-semibold">
												En proceso
											</Badge>
										) : null}
									</div>
									<h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
									<p className="text-sm text-muted-foreground flex-1">{contribution.description}</p>
									<div className="flex flex-wrap gap-1 mt-4">
										{contribution.tags.map((tag) => (
											<span key={tag} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
												{tag}
											</span>
										))}
									</div>
									{contribution.url ? (
										<Button variant="outline" size="sm" className="mt-4 w-full" asChild>
											<a
												href={contribution.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												Visitar {projectVisitLabel(contribution)}
												<ExternalLink aria-hidden />
												<span className="sr-only">(abre en nueva pestaña)</span>
											</a>
										</Button>
									) : null}
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
