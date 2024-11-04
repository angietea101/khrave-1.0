export interface Post {
    id: int;
    title: string;
    content: string;
    author: {
        username: string;
    };
    vendor: {
        vendorName: string;
    };
}
