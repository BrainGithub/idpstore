// "use client"; // Mark this component as a Client Component

// import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageGalleryProps {
	images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
	// const [page, setPage] = useState(0);
	// const imagesPerPage = 3;

	// const paginatedImages = images.slice(page * imagesPerPage, (page + 1) * imagesPerPage);

	return (
		<div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
			{images.map((image, index) => (
				<Link
					key={`${index}`}
					href={`${image}`}
					//   as={`/p/${id}`}
					//   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
					shallow
					className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
				>
					<Image
						alt="photo"
						className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
						style={{ transform: "translate3d(0, 0, 0)" }}
						placeholder="blur"
						blurDataURL={`${image}`}
						src={`${image}`}
						priority
						width={720}
						height={480}
						sizes="(max-width: 640px) 100vw,
						(max-width: 1280px) 50vw,
						(max-width: 1536px) 33vw,
						25vw"
					/>
				</Link>
			))}
			{/* </div> */}
			{/* <button onClick={() => setPage(page - 1)} disabled={page === 0}>
				Previous
			</button>
			<button onClick={() => setPage(page + 1)} disabled={(page + 1) * imagesPerPage >= images.length}>
				Next
			</button> */}
		</div>
	);
}
