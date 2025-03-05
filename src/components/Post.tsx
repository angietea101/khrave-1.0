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
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    console.log(`image ${image}`)
    
    return (
        <div className={''}>
            <div className={'post-container'}>
                <div className={'subject-wrapper'}>
                    <h3>{title}</h3>
                    <h3>|</h3>
                    <h3>@{author.username}</h3>
                    <h3>|</h3>
                    <h3>Posted: {createdAt.slice(0, 10)}</h3>
                </div>
                <div className={`content-wrapper ${isUserPost ? "post-margin" : ""}`}>
                    <p>{formattedContent}</p> 
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
