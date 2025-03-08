// src/components/Post.tsx

type PostProps = {
    id: number;
    title: string;
    content?: string;
    image?: string;
    author: { username: string };
    vendor: { vendorName: string };
    createdAt: string;
    isUserPost?: boolean;
};

export default function Post({ title, content, image, author, isUserPost, createdAt }: PostProps) {
    const formattedContent = content?.trim().split('\n').map((line, index) => (
        <span className="post-container-desc" key={index}>
            {line}
            <br />
        </span>
    ));
    
    return (
        <div className={''}>
            <div className={'post-container'}>
                <div className={'subject-wrapper'}>
                    <h3 className="post-username">@{author.username}</h3>
                    <h3 className="post-title">{title}</h3>
                    <h3 className="post-date">{createdAt.slice(0, 10)}</h3>
                </div>
                <div className={`content-wrapper ${isUserPost ? "post-margin" : ""}`}>
                    <p className="post-container-desc">{formattedContent}</p> 
                    {image && (
                    <img 
                        src={image} 
                        alt={`Image for ${title}`} 
                        className="post-image"
                    />
                    )}
                </div>
            </div>
            
        </div>
    );
}
