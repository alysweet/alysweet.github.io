const API_URL = "https://graph.instagram.com/me/media?fields=";
const API_FIELDS = "caption,media_url,media_type,permalink,timestamp,username";
const ACCESS_TOKEN =
  "IGQVJYSmZAoTUxxQTJmTDQtLUU3WU9qZA085YmplLVhPTldleHpobnFWdGxzN25HcXFRSFNwTlczMzRINjItZATZAXQ0lRM3NyV0MyUzJOQTVsLWVXSVB2ZAFVwX3dZAVDhaQ3ZAPUnVhM2wtLVU2UkFNbVJKZAgZDZD";

fetch(API_URL + API_FIELDS + "&access_token=" + ACCESS_TOKEN)
  .then((r) => r.json())
  .then((results) => {
    console.log(results);
    if (!results.data) {
      return;
    }
    const feedDiv = document.getElementById("ig-feed");

    feedDiv.innerHTML = results.data
      .map(
        (post) =>
          (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") &&
          `
            <div class="column is-4">
              <a
                href="${post.permalink}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <figure
                  class="image is-square work-item"
                  style="background-image: url('${post.media_url}'); background-position: center;"
                ></figure>
              </a>
            </div>
          `
      )
      .filter((p) => p)
      .slice(0, 12)
      .join("\n");
  });
