type PostProps = {
    id: number;
    title: string;
    content?: string;
    author: { username: string };
    vendor: { vendorName: string };
};

export default function Post({ id, title, content, author, vendor }: PostProps) {
    return (
        <div className={''}>
            <div className={'post-container'}>
                <div className={'subject-wrapper'}>
                    <h3>{title}</h3>
                    <h3>|</h3>
                    <h3>@{author.username}</h3>
                </div>
                <p>{content}</p>
            </div>
        </div>
    );
}
