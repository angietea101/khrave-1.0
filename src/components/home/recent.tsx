'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../ui/ArrowRight";

type Post = {
    id: number;
    title: string;
    image: string | null;
    vendor: { vendorName: string };
}

const Recent = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate number of items to show based on window width
  const itemsToShow = windowWidth < 740 ? 2 : windowWidth < 1200 ? 3 : 4;

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getRecentPosts = async () => {
        try {
            const res = await fetch("/api/recent-posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching recent posts:", error);
        }
    }

    getRecentPosts();
  }, []);

  const displayedPosts = posts.slice(0, itemsToShow);

  return (
    <div className="home-body-container">
      <div className="section-title-wrapper">
        <p>recent orders</p>
        <Link href="/recent" className="browse-wrapper">
          <span>browse all</span>
          <ArrowRight />
        </Link>
      </div>

      <div className="recent-picture-gallery">
        {displayedPosts.map((post) => (
          <div key={post.id} className="food-rectangle">
            <Link href={`/post/${post.id}`} className="image-shape">
              <Image
                className="food-rectangle-image object-cover"
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                height={200}
                width={200}
              />
            </Link>
            <h4>{post.title}</h4>
            <p>{post.vendor?.vendorName || "Unknown Vendor"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
