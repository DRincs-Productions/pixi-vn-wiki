export interface Contributor {
    login: string;
    avatar_url: string;
    contributions: number;
}

async function fetchContributors(owner: string, repo: string): Promise<Contributor[]> {
    try {
        const headers = new Headers();
        if (process.env.GITHUB_TOKEN)
            headers.set("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
            {
                headers,
                next: { revalidate: 60 * 60 * 24 },
            },
        );

        if (!response.ok) return [];

        const contributors = (await response.json()) as Contributor[];
        return contributors.filter((contributor) => !contributor.login.endsWith("[bot]"));
    } catch {
        return [];
    }
}

export async function fetchAllContributors(owner: string, repos: string[]): Promise<Contributor[]> {
    const results = await Promise.all(repos.map((repo) => fetchContributors(owner, repo)));

    const merged = new Map<string, Contributor>();
    for (const contributor of results.flat()) {
        const existing = merged.get(contributor.login);
        if (existing) {
            existing.contributions += contributor.contributions;
        } else {
            merged.set(contributor.login, { ...contributor });
        }
    }

    return Array.from(merged.values()).sort((a, b) => b.contributions - a.contributions);
}

export interface Translator {
    login: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
}

interface CrowdinMember {
    username: string;
    fullName: string;
    avatarUrl: string;
}

// requires CROWDIN_TOKEN (Personal Access Token) and CROWDIN_PROJECT_ID env vars;
// resolves to an empty list when they're not configured.
export async function fetchCrowdinTranslators(): Promise<Translator[]> {
    const token = process.env.CROWDIN_TOKEN;
    const projectId = process.env.CROWDIN_PROJECT_ID;
    if (!token || !projectId) return [];

    try {
        const response = await fetch(
            `https://api.crowdin.com/api/v2/projects/${projectId}/members?role=translator&limit=500`,
            {
                headers: { Authorization: `Bearer ${token}` },
                next: { revalidate: 60 * 60 * 24 },
            },
        );

        if (!response.ok) return [];

        const { data } = (await response.json()) as { data: { data: CrowdinMember }[] };
        return data
            .map(({ data: member }) => member)
            .filter((member) => member.avatarUrl)
            .map((member) => ({
                login: member.username,
                name: member.fullName,
                avatarUrl: member.avatarUrl,
                profileUrl: `https://crowdin.com/profile/${member.username}`,
            }));
    } catch {
        return [];
    }
}
