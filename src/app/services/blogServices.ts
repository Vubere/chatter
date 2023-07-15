



export default class BlogServices {
    static getBlogList() {
    }
    static async postBlog(blog:{
        title: string,
        content: string,
        coverImage: string,
        excerpt: string,
        author: string,
        state: string,
        tags: string[],
    }){
        const res = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        return await res.json();
    }
    static async getBlog(id:string){
        const res = await fetch("/api/blogs?id="+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    static async getAllBlogs(){
        const res = await fetch("/api/blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    static async updateBlog(id:string, blog:{
        title: string,
        content: string,
        coverImage: string,
        excerpt: string,
        state: string,
        tags: string[],
    }){
        const res = await fetch("/api/blogs?id="+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        return await res.json();
    }
}