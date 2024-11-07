// src/components/Post.tsx

type PostProps = {
    id: number;
    title: string;
    content?: string;
    author: { username: string };
    vendor: { vendorName: string };
};

export default function Post({ title, content, author }: PostProps) {
    const formattedContent = content?.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
    
    return (
        <div className={''}>
            <div className={'post-container'}>
                <div className={'subject-wrapper'}>
                    <h3>{title}</h3>
                    <h3>|</h3>
                    <h3>@{author.username}</h3>
                </div>
                <p>{formattedContent}</p>
            </div>
        </div>
    );
}
