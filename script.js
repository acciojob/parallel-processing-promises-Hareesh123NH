//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImg(image) {
	return new Promise((res,rej)=>{
		const img=new Image();
		img.src=image.url;

		img.onload=()=>res(img);
		img.onerror=()=>rej(new Error(`Failed to load image's URL: ${image.url}`));
		
	});
}

function downloadAllImgs() {
	const promises=images.map(img=>downloadImg(img));

	Promise.all(promises)
		.then((imgs)=>{
			output.innerHTML='';
			imgs.forEach(img => output.appendChild(img));
		})
		.catch(error => {
            console.error(error.message);
            alert(error.message);
        });
}

btn.addEventListener('click', () => {
    downloadAllImgs();
});
