import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDXContent
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                        img: (props) => {
                            console.log(props);
                            if (props.alt.endsWith("h3")) {
                                return (
                                    <ImageZoom
                                        {...props}
                                        style={{
                                            width: "26px",
                                            height: "26px",
                                            marginRight: "5px",
                                            float: "left",
                                            borderRadius: "5px",
                                            marginBottom: "0px",
                                            marginTop: "15px",
                                            ...props.style,
                                        }}
                                    />
                                );
                            }
                            return <ImageZoom {...props} />;
                        },
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
