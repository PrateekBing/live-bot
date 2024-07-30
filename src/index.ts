export interface Env {
	DB: D1Database;
  }
  
  export default {
	async fetch(request: Request, env: Env, ctx: any) {
		if (request.method === 'POST' && request.headers.get("token") === token) {
			try {
				const requestBody = await request.text();
				const DB = env.DB;
				const info = await DB.prepare('INSERT INTO messages (messageContent) VALUES (?)')
                    .bind(requestBody)
                    .run()
				console.log(info);
				console.log("Request body: ", requestBody);
				return new Response(`Received string: ${requestBody}`);
				
			} catch (error) {
				return new Response('Error reading request body', { status: 400 });
			}
		} else {
			const { results } = await env.DB.prepare("SELECT messageContent FROM messages").all();
			let lastElement = results[results.length - 1];
			const final = lastElement.messageContent;
			return new Response(`<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Latest from Prateek</title> <style> body { background-color: #f2d5aa; font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; } .container { text-align: center; } h1 { font-size: 100px; color: #391e10; margin-bottom: 20px; } p { font-size: 24px; color: #666; margin-bottom: 40px; } .logo { width: 100px; height: 100px; margin-bottom: 20px; } a { color: #9b6217; } a:hover { color: #437118; } p { color: #391e10; } </style> </head> <body> <div class="container"> <h1>${final}</h1> <p><a href="https://github.com/PrateekBing/live-bot">Live Bot</a> is a Discord bot that takes the latest message from <a href="https://prateekdeshmukh.com">Prateek's</a> private discord server and broadcasts it on this website. Like a proto-twitter.</p> </div> </body> </html>`, {headers: { 'Content-Type': 'text/html' },});
	  		}
	}};
