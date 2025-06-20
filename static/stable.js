//import { toBase64, toBase64, uploadFile} from "./aicamp_day3/ai_camp_day3.js";
let input = document.querySelector(".user-input")
let submit = document.querySelector(".submit")
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/nscale/v1/images/generations",
		{
			headers: {
				Authorization: `Bearer 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`, 
				"Content-Type": "application/json",
			},
			method: "POST",		
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}


//query({     response_format: "b64_json",
//    prompt: "\"Astronaut riding a horse\"",
//    model: "stabilityai/stable-diffusion-xl-base-1.0", }).then(async(response) => {
    // Use image
//    let tobase64 = await tobase64(resposne)
//    let imageURL = await uploadFile(toBase64)
//    console.log*(imageURL)
//});

async function generateImage() {
	try {
		//Make sure to await the query and assign it to result
		const result = await query({
			prompt: input.value,
			model: "stabilityai/stable-diffusion-xl-base-1.0",
			response_format: "b64_json"
		});
		//Extract base64 image string
		const base64 = result.data[0].b64_json;
		const img = document.createElement("img");
		img.src = `data:image/png;base64,${base64}`;
		document.body.appendChild(img);

	} catch (error) {
		console.error("Failed to generate image:", error);
	}
}

generateImage();

submit.addEventListener("click", () => {
	if(input.value != ""){
			generateImage();

	}
});
