// src/components/Post.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import styles from "@/app/styles/Post.module.css";
import Image from "next/image";

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

type Tag = {
  label: string;
  count: number;
  hasTagged: boolean;
}

export default function Post({ id, title, content, image, author, isUserPost, createdAt}: PostProps) {
    const {data: session} = useSession();
    const [likes, setLikes] = useState<number>(0);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    // DUMMY DATA FOR TAG UI TESTING
    const [tags, setTags] = useState<Tag[]>([
      { label: "Salty", count: 1, hasTagged: true },
      { label: "Sweet", count: 0, hasTagged: false },
      { label: "Spicy", count: 1, hasTagged: true },
      { label: "Bland", count: 0, hasTagged: false },
    ]);
    const handleTag = (tag: string) => {
      setTags((prevTags) => {
        const updatedTags = prevTags.map((t) => {
          if (t.label === tag) {
            if (t.hasTagged === false) return { ...t, count: t.count + 1, hasTagged: true };
            else return { ...t, count: t.count - 1, hasTagged: false };
          } else {
            return t;
          }
        });
        return updatedTags;
      });
    }

    // handling click outside of tag menu to close it
    const [tagsOpen, setTagsOpen] = useState<boolean>(false);
    const menuVisible = (initial: boolean) => {
      const ref = useRef<HTMLDivElement>(null);
      const handleClickOutside = (e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setTagsOpen(false);
        }
      }
      useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        }
      })
      return { ref };
    }
    const { ref } = menuVisible(false);

    // Fetch the number of likes 
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`/api/post/${id}/like`);
                const data = await response.json();
                if (data.success) {
                    setLikes(data.likes);
                    setHasLiked(data.hasLiked)
                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [id]);

  const handleLike = async () => {
    if (!session) {
      alert("You must be logged in to like this post!");
      return;
    }
    try {
      const response = await fetch(`/api/post/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLikes((prevLikes) =>
            data.message === "Post liked" ? prevLikes + 1 : prevLikes - 1
          );
          setHasLiked((() => data.message === "Post liked" ? true : false));
        }
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const formattedContent = content
    ?.trim()
    .split("\n")
    .map((line, index) => (
      <span className={styles.postContainerDescription} key={index}>
        {line}
        <br />
      </span>
    ));

  return (
    <div className={""}>
      <div className={styles.postContainer}>
        <div className={styles.subjectWrapper}>
          <h3 className={styles.postUsername}>@{author.username}</h3>
          <h3 className={styles.postTitle}>{title}</h3>
          <h3 className={styles.postDate}>{createdAt.slice(0, 10)}</h3>
        </div>
        <div
          className={`${styles.contentWrapper} ${
            isUserPost ? styles.postMargin : ""
          }`}
        >
          {" "}
          <p className={styles.postContainerDescription}>{formattedContent}</p>
          {image && (
            <img
              src={image}
              alt={`Image for ${title}`}
              className={styles.postImage}
            />
          )}
        </div>
        <div className={styles.likeAndTagWrapper}>
          <button onClick={handleLike} className={styles.likeButton}>
            <Image
              src={hasLiked ? "/icons/like-button-active.svg":"/icons/like-button.svg"}
              alt="Like Button"
              width={24}
              height={24}
            />
          </button>
          <span>{likes}</span>
          <div>
            {tagsOpen ?
            <div ref={ref} className={styles.tagMenuWrapper}>
              {tags.map((tag) =>
              (<button key={tag.label} className={styles.tagWrapper + tag.label}
                onClick={() => {handleTag(tag.label)}}
                >
              <div className={styles.tagLabelWrapper + tag.label}>{tag.label}</div>
              {tag.count > 0 && (
                <div className={styles.tagNumberWrapper + tag.label}>
                  {tag.count}
                </div>
              )
              }</button>))}</div>
             : 
             <div className={styles.tagMenuWrapper}>
              {tags.map((tag) => (
                (tag.count > 0) && (<button key={tag.label} className={styles.tagWrapper + tag.label}
                  onClick={() => {handleTag(tag.label)}}
                  >
                <div className={styles.tagLabelWrapper + tag.label}>{tag.label}</div>
                {tag.count > 0 && (
                  <div className={styles.tagNumberWrapper + tag.label}>
                    {tag.count}
                  </div>
                )}
                </button>)))}
              <button className={styles.addTagWrapper} onClick={() => {setTagsOpen(true)}}>+</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

