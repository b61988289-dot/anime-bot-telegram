import io
import random
import urllib.parse
import aiohttp

BASE_URL = "https://image.pollinations.ai/prompt"

GENRE_PROMPTS = {
    "acao": [
        "anime warrior with glowing sword in epic battle scene, dynamic action pose, dramatic lighting",
        "anime mecha robot fighting in destroyed city, explosions, high detail",
        "anime ninja in mid-air combat, shuriken flying, moonlight background",
        "anime samurai duel at sunset, cherry blossoms falling, cinematic",
        "anime hero powering up with energy aura, lightning effects, dramatic",
    ],
    "aventura": [
        "anime explorers discovering ancient floating island, lush nature, magical atmosphere",
        "anime group on a ship sailing through mystical ocean, giant creatures in distance",
        "anime adventurer in front of massive dungeon entrance, torch light, mysterious",
        "anime characters crossing a magical bridge over clouds, fantasy landscape",
        "anime explorer finding treasure in ancient temple, golden light rays",
    ],
    "romance": [
        "anime couple watching sunset on school rooftop, cherry blossoms, soft lighting",
        "anime boy and girl sharing umbrella in the rain, city lights, romantic atmosphere",
        "anime characters meeting on a train platform, evening sky, emotional scene",
        "anime couple under starry sky, fireflies, peaceful meadow",
        "anime characters in a cozy cafe, warm lighting, gentle rain outside window",
    ],
    "fantasia": [
        "anime sorcerer casting powerful spell, magical circles, fantasy castle background",
        "anime dragon and rider flying over enchanted forest, epic fantasy landscape",
        "anime witch in magical library, floating books, mystical purple light",
        "anime knight facing ancient demon in dark throne room, dramatic lighting",
        "anime fairy kingdom with crystal towers, magical creatures, ethereal glow",
    ],
    "ficcao_cientifica": [
        "anime astronaut floating in space station, earth visible through window, futuristic",
        "anime cyberpunk city at night, neon lights, flying vehicles, rain",
        "anime scientist in advanced laboratory, holographic displays, futuristic tech",
        "anime pilot in cockpit of advanced spacecraft, stars and nebula outside",
        "anime android with glowing eyes in futuristic city, cinematic composition",
    ],
    "misterio": [
        "anime detective in dark alley, foggy night, street lamp, noir atmosphere",
        "anime character investigating haunted mansion, moonlight, shadows",
        "anime mysterious figure with mask in rainy city, reflections, dark",
        "anime characters finding hidden door in old library, dust particles, mystery",
        "anime investigator with magnifying glass, crime scene, dramatic shadows",
    ],
    "terror": [
        "anime horror scene in abandoned hospital, dark corridors, eerie green light",
        "anime ghost appearing in misty forest at night, creepy atmosphere",
        "anime character face to face with shadowy monster, red eyes glowing",
        "anime haunted school at midnight, broken windows, supernatural fog",
        "anime dark creature emerging from mirror, horror atmosphere, dramatic",
    ],
}

DEFAULT_PROMPTS = [
    "anime character standing on cliff overlooking fantasy world, epic landscape, detailed",
    "anime hero with flowing cape, sunrise background, cinematic composition",
    "anime warrior in enchanted forest, magical particles, beautiful lighting",
    "anime character with glowing powers, dramatic pose, vibrant colors",
    "anime scene with ancient temple, mystical atmosphere, detailed background",
]


async def generate_anime_image(genre: str | None = None) -> io.BytesIO | None:
    if genre and genre in GENRE_PROMPTS:
        prompt = random.choice(GENRE_PROMPTS[genre])
    else:
        prompt = random.choice(DEFAULT_PROMPTS)

    prompt += ", anime style, high quality, detailed, 4k"
    seed = random.randint(1, 999999)
    encoded = urllib.parse.quote(prompt)
    url = f"{BASE_URL}/{encoded}?width=512&height=512&nologo=true&seed={seed}&model=flux"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=60)) as resp:
                if resp.status == 200:
                    data = await resp.read()
                    if len(data) > 1000:
                        buf = io.BytesIO(data)
                        buf.name = "anime_image.jpg"
                        return buf
    except Exception as e:
        print(f"Image generation error: {e}")

    return None
