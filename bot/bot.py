import discord
import requests
import os

client = discord.Client(intents=discord.Intents.all())

def uploading(message):
    headersList = {
        "token": os.getenv('secret'),
         "Content-Type": "text/plain" 
    }
    url = 'https://live.prateekdeshmukh.com'
    x = requests.post(url, data = message, headers=headersList)

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


client.run(os.getenv('TOKEN'))
    