import discord
import requests
import os

client = discord.Client(intents=discord.Intents.all())

def uploading(message):
    headersList = {
        "token": os.getenv("secret"),
         "Content-Type": "text/plain" 
    }
    url = 'https://live.prateekdeshmukh.com'
    x = requests.post(url, data = message, headers=headersList)

def uploadingImage(img):
    headersList = {
        "token": os.getenv("secret2")
    }
    url = "https://pixo-81h.pages.dev/api/upload"
    x = requests.post(url, data = img, headers = headersList)

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if message.channel.id == 1251069790437507132:
        print("Message received: ", message.content)
        uploading(message.content)
        return
    if message.channel.id == 1268065496436178945 and message.attachments:
        for i in range(len(message.attachments)):
            content = message.attachments[i].url
            uploadingImage(content)
            print(content)


client.run(os.getenv("TOKEN"))