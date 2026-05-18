import random

# Videos de animacao livre / fan-made / creative commons por genero
# Inclui animacoes independentes e fan animations sem copyright
ANIME_VIDEOS = {
    "acao": [
        {"title": "Anime Action Scene - Fan Animation", "url": "https://youtu.be/OjNw75bJyqk"},
        {"title": "Epic Sword Fight Animation", "url": "https://youtu.be/1LJvtkEaQe0"},
        {"title": "Anime Battle AMV - Royalty Free", "url": "https://youtu.be/DP-_E1h0jOw"},
        {"title": "Animated Short - The Duel", "url": "https://youtu.be/FtutLA63Cp8"},
        {"title": "Indie Anime Fight Scene", "url": "https://youtu.be/Y5bK9BcR_Hw"},
    ],
    "aventura": [
        {"title": "Animated Short - Journey", "url": "https://youtu.be/0TgrorCZg80"},
        {"title": "Anime Adventure - Fan Made", "url": "https://youtu.be/hYDv05KhLDY"},
        {"title": "The Explorer - Animation Short", "url": "https://youtu.be/xjDjIWPwcPU"},
        {"title": "Animated World Exploration", "url": "https://youtu.be/kMe6ae2sOHI"},
        {"title": "Indie Anime - New Horizons", "url": "https://youtu.be/p1Zt47V3pPw"},
    ],
    "romance": [
        {"title": "Anime Love Story - Short Film", "url": "https://youtu.be/udFMaJoLmGY"},
        {"title": "Animated Short - Two Hearts", "url": "https://youtu.be/wBirf9Dleyo"},
        {"title": "Anime Romance AMV - Indie", "url": "https://youtu.be/vVLJbo4GXJY"},
        {"title": "Short Film - Under the Stars", "url": "https://youtu.be/0c_mhrB7LlQ"},
        {"title": "Animated Love Story", "url": "https://youtu.be/tJBt2V5-Q68"},
    ],
    "fantasia": [
        {"title": "Fantasy Animation Short", "url": "https://youtu.be/QRg_8NNPTD8"},
        {"title": "Anime Magic Battle - Fan Made", "url": "https://youtu.be/lU6cYOhuZi4"},
        {"title": "The Enchanted Forest - Short Film", "url": "https://youtu.be/cCeeTfsm8bk"},
        {"title": "Fantasy World Animation", "url": "https://youtu.be/CVke__4OZ3o"},
        {"title": "Dragons and Magic - Indie Anime", "url": "https://youtu.be/mQ2f-7FYf3Y"},
    ],
    "ficcao_cientifica": [
        {"title": "Sci-Fi Anime Short Film", "url": "https://youtu.be/BFO2usVjfQc"},
        {"title": "Animated Short - Beyond Stars", "url": "https://youtu.be/su1Nt5aXV8E"},
        {"title": "Cyberpunk Animation - Indie", "url": "https://youtu.be/V3UPkSL2-RE"},
        {"title": "Space Station - Short Film", "url": "https://youtu.be/WVLhwHrXsKQ"},
        {"title": "Future World Animation", "url": "https://youtu.be/i8kkeztq70c"},
    ],
    "comedia": [
        {"title": "Funny Anime Short - Fan Made", "url": "https://youtu.be/NJR8Inf77Ac"},
        {"title": "Comedy Animation Short", "url": "https://youtu.be/BpHSm0KcW7o"},
        {"title": "Anime Comedy Skit", "url": "https://youtu.be/yzC4hFK5P3g"},
        {"title": "Funny Character Animation", "url": "https://youtu.be/f4Mc-NYPHaQ"},
        {"title": "Indie Anime Comedy", "url": "https://youtu.be/qpl5mOAXNl4"},
    ],
    "terror": [
        {"title": "Horror Anime Short Film", "url": "https://youtu.be/w1o4O2SfQ5g"},
        {"title": "Animated Horror - Dark Night", "url": "https://youtu.be/A8q-t5WQMXY"},
        {"title": "Creepy Animation Short", "url": "https://youtu.be/xLUSHkGbj1I"},
        {"title": "Anime Horror - The Shadow", "url": "https://youtu.be/y-bgGJ5FMog"},
        {"title": "Dark Animation - Indie", "url": "https://youtu.be/ns1SGo3WCF4"},
    ],
    "misterio": [
        {"title": "Mystery Anime Short Film", "url": "https://youtu.be/xgbJ9ItUcXM"},
        {"title": "Animated Mystery - The Clue", "url": "https://youtu.be/t8XbrEAKnPE"},
        {"title": "Detective Animation Short", "url": "https://youtu.be/HcIy-MxSDBs"},
        {"title": "Anime Mystery - Fan Made", "url": "https://youtu.be/4q1dgn_C0AU"},
        {"title": "The Unsolved - Animation", "url": "https://youtu.be/XvnwL1FpCso"},
    ],
}


def get_anime_video(genre: str | None = None) -> dict:
    if genre and genre in ANIME_VIDEOS:
        return random.choice(ANIME_VIDEOS[genre])
    all_videos = [v for vids in ANIME_VIDEOS.values() for v in vids]
    return random.choice(all_videos)


def get_anime_videos_list(genre: str, count: int = 3) -> list[dict]:
    if genre in ANIME_VIDEOS:
        videos = ANIME_VIDEOS[genre]
        return random.sample(videos, min(count, len(videos)))
    return []
