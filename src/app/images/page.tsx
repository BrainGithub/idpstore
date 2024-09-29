import fs from "fs";
import path from "path";
import { Suspense } from "react";
import { ImageGallery } from "./imageGallery";
import { Pagination } from "./pagination"; // Ensure Pagination is imported or defined

export const metadata = {
	title: "Axpz Posts",
	description: "",
};

const numImagesOnePage = 10;

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	console.dir(searchParams);

	// const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const imagesDir = path.join(process.cwd(), "public/images");

	// Read the image files from the public/images directory
	const imageFiles = fs.readdirSync(imagesDir).map((file) => path.join("/images", file));

	const totalPages = imageFiles.length;
	imageFiles.slice(currentPage);

	const start = (currentPage - 1) * numImagesOnePage;
	let end = currentPage * numImagesOnePage;
	if (end > totalPages) {
		end = totalPages;
	}

	console.log("searchParams:", searchParams);
	console.log("total:%d, currentPage:%s, start:%s, end:%s", totalPages, currentPage, start, end);

	return (
		<div>
			<Suspense key={currentPage} fallback={<div>Loading...</div>}>
				<ImageGallery images={imageFiles.slice(start, end)} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={Math.ceil(totalPages / numImagesOnePage)} />
			</div>
		</div>
	);
}
