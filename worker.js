export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing 'url' query parameter", { status: 400 });
    }

    try {
      const res = await fetch(target);

      if (!res.ok) {
        return new Response(`Failed to fetch image: ${res.status}`, { status: res.status });
      }

      const contentType = res.headers.get("content-type") || "image/png";

      return new Response(res.body, {
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (err) {
      return new Response("Error fetching image", { status: 500 });
    }
  }
};
