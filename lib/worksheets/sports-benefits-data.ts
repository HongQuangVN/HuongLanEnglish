// Dữ liệu CÔNG KHAI cho học sinh — chỉ chứa câu hỏi, KHÔNG chứa đáp án.
// Đáp án nằm ở app/api/worksheets/sports-benefits/answer-key.ts (server-only).

export const FIB_SENTENCES: string[] = [
  "Many people love to {{1}} and cheer for their favorite teams.",
  "Exercising when we're young can {{1}}.",
  "Physical activity helps {{1}}.",
  "Regular exercise can {{1}}, high blood pressure, and diabetes.",
  "Endorphins released during exercise can {{1}} and improve your mood and memory.",
  "Being part of a team makes it easier to {{1}}.",
  "School sport participation has been shown to {{1}} for up to four years.",
  "Training with a good coach helps you {{1}}.",
  "Coming to terms with defeat helps you {{1}}.",
  "Being on a team means you become part of a {{1}}.",
];

export const WORD_BANK: string[] = [
  "glorify victory on the playing field",
  "strengthen our bones",
  "clear out bad cholesterol from our arteries",
  "decrease the risk of stroke",
  "sharpen your focus",
  "establish a regular habit of exercise",
  "reduce the risk of depression",
  "reinforce a growth mindset",
  "build resilience and self-awareness",
  "supportive community",
];

export const TRANSCRIPT_PARAGRAPHS: string[] = [
  "The victory of the underdog over the favored team. The last minute penalty shot that wins the tournament. The high-energy training montages. Many people love to glorify victory on the playing field, cheer for favorite teams, and play sports. But here's a question: Should we be so obsessed with sports? Is playing sports actually as good for us as we make it out to be, or just a fun and entertaining pastime? What does science have to say?",
  "First of all, it's well accepted that exercise is good for our bodies and minds, and that's definitely true. Exercising, especially when we're young, has all sorts of health benefits, like strengthening our bones, clearing out bad cholesterol from our arteries, and decreasing the risk of stroke, high blood pressure, and diabetes. Our brains also release a number of chemicals when we workout, including endorphins. These natural hormones, which control pain and pleasure responses in the central nervous system, can lead to feelings of euphoria, or, what's often called, a runner's high. Increased endorphins and consistent physical activity in general can sharpen your focus and improve your mood and memory.",
  "So does that mean we get just as much benefit going to the gym five days a week as we would joining a team and competing? Well, here's where it gets interesting: because it turns out that if you can find a sport and a team you like, studies show that there are all sorts of benefits that go beyond the physical and mental benefits of exercise alone.",
  "Some of the most significant are psychological benefits, both in the short and long term. Some of those come from the communal experience of being on a team, for instance, learning to trust and depend on others, to accept help, to give help, and to work together towards a common goal. In addition, commitment to a team and doing something fun can also make it easier to establish a regular habit of exercise. School sport participation has also been shown to reduce the risk of suffering from depression for up to four years.",
  'Meanwhile, your self-esteem and confidence can get a big boost. There are a few reasons for that. One is found in training. Just by working and working at skills, especially with a good coach, you reinforce a growth mindset within yourself. That\'s when you say, "Even if I can\'t do something today, I can improve myself through practice and achieve it eventually." That mindset is useful in all walks of life.',
  "And then there's learning through failure, one of the most transformative, long-term benefits of playing sports. The experience of coming to terms with defeat can build the resilience and self-awareness necessary to manage academic, social, and physical hurdles. So even if your team isn't winning all the time, or at all, there's a real benefit to your experience.",
  "Now, not everyone will enjoy every sport. Perhaps one team is too competitive, or not competitive enough. It can also take time to find a sport that plays to your strengths. That's completely okay. But if you spend some time looking, you'll be able to find a sport that fits your individual needs, and if you do, there are so many benefits. You'll be a part of a supportive community, you'll be building your confidence, you'll be exercising your body, and you'll be nurturing your mind, not to mention having fun.",
];

export const TRANSLATION_PROMPTS: string[] = [
  "1. Nhiều người thích tôn vinh chiến thắng trên sân đấu và cổ vũ đội bóng yêu thích của mình.",
  "2. Tập thể dục khi còn trẻ giúp xương chắc khỏe hơn và giảm cholesterol xấu trong động mạch.",
  "3. Vận động thường xuyên giúp giảm nguy cơ đột quỵ, huyết áp cao và tiểu đường.",
  "4. Chơi thể thao trong trường học giúp học sinh giảm nguy cơ trầm cảm trong nhiều năm.",
  "5. Khi bạn thua cuộc, bạn học cách xây dựng sự kiên cường và nhận thức về bản thân.",
];

export const GRAMMAR_ROWS: { structure: string; note: string; example: string }[] = [
  {
    structure: "Verb + Noun phrase để diễn tả tác động",
    note: "(strengthen / decrease / reduce / build + noun)",
    example:
      '"...can strengthen our bones", "...can decrease the risk of stroke"',
  },
  {
    structure: 'Modal "can" + verb khi nói về khả năng/lợi ích tiềm năng',
    note: "",
    example: '"Exercise can sharpen your focus and improve your mood."',
  },
];

export const SPEAKING_QUESTIONS: string[] = [
  "Do you play any sports? Which one, and why do you like it?",
  "According to the video, how can sports help your body? Name two benefits.",
  "How can playing on a team help your mental health and confidence?",
  "Have you ever learned something important from losing a game? What was it?",
];

export const GLOSSARY: [string, string][] = [
  ["glorify victory", "tôn vinh/ca ngợi chiến thắng"],
  ["strengthen our bones", "làm xương chắc khỏe"],
  ["clear out cholesterol", "loại bỏ cholesterol"],
  ["decrease the risk of stroke", "giảm nguy cơ đột quỵ"],
  ["endorphins", "hormone endorphin (tạo cảm giác hưng phấn)"],
  ["sharpen your focus", "giúp tập trung hơn"],
  ["establish a habit", "hình thành thói quen"],
  ["reduce the risk of depression", "giảm nguy cơ trầm cảm"],
  ["growth mindset", "tư duy phát triển"],
  ["resilience", "sự kiên cường, khả năng phục hồi"],
  ["self-awareness", "nhận thức về bản thân"],
  ["supportive community", "cộng đồng hỗ trợ lẫn nhau"],
];

export const MINDMAP_SVG = `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
  <line x1="350" y1="200" x2="120" y2="80" stroke="#ffb3c6" stroke-width="3"/>
  <line x1="350" y1="200" x2="580" y2="80" stroke="#ffb3c6" stroke-width="3"/>
  <line x1="350" y1="200" x2="120" y2="320" stroke="#ffb3c6" stroke-width="3"/>
  <line x1="350" y1="200" x2="580" y2="320" stroke="#ffb3c6" stroke-width="3"/>

  <circle cx="120" cy="80" r="55" fill="#ffe3ec"/>
  <text x="120" y="76" text-anchor="middle" fill="#c93465" font-size="12" font-weight="700">Physical</text>
  <text x="120" y="92" text-anchor="middle" fill="#c93465" font-size="11">bones · heart</text>

  <circle cx="580" cy="80" r="55" fill="#ffe3ec"/>
  <text x="580" y="76" text-anchor="middle" fill="#c93465" font-size="12" font-weight="700">Brain</text>
  <text x="580" y="92" text-anchor="middle" fill="#c93465" font-size="11">focus · mood</text>

  <circle cx="120" cy="320" r="55" fill="#ffe3ec"/>
  <text x="120" y="316" text-anchor="middle" fill="#c93465" font-size="12" font-weight="700">Teamwork</text>
  <text x="120" y="332" text-anchor="middle" fill="#c93465" font-size="11">trust · help</text>

  <circle cx="580" cy="320" r="55" fill="#ffe3ec"/>
  <text x="580" y="316" text-anchor="middle" fill="#c93465" font-size="12" font-weight="700">Confidence</text>
  <text x="580" y="332" text-anchor="middle" fill="#c93465" font-size="11">growth mindset</text>

  <circle cx="350" cy="200" r="70" fill="#ff5c8a"/>
  <text x="350" y="195" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">SPORTS</text>
  <text x="350" y="214" text-anchor="middle" fill="#fff" font-size="12">Benefits</text>
</svg>`;
