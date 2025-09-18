import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: "Project Alpha",
    description: "A web application for data visualization, built with Next.js and D3.js, demonstrating complex data handling and interactive UIs.",
    image: PlaceHolderImages.find(p => p.id === 'project-1'),
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Project Beta",
    description: "An e-commerce platform with a focus on user experience and mobile-first design, featuring a custom CMS and payment gateway integration.",
    image: PlaceHolderImages.find(p => p.id === 'project-2'),
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Project Gamma",
    description: "A content management system for a non-profit, empowering them to manage their own content with a simple, intuitive interface.",
    image: PlaceHolderImages.find(p => p.id === 'project-3'),
    liveUrl: "#",
    githubUrl: "#",
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-32 border-t">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">My Work</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          A selection of projects that showcase my skills in web development and design.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="p-0">
              {project.image && (
                <div className="aspect-video overflow-hidden">
                   <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.image.imageHint}
                    />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
              <p className="mt-2 text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-end gap-2">
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
