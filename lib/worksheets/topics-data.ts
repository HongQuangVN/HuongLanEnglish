// File dữ liệu CÔNG KHAI cho học sinh — chỉ chứa câu hỏi, KHÔNG chứa đáp án.
// Đáp án nằm riêng ở app/api/worksheets/five-topics/grade/route.ts (server-only).

export type FibRow = {
  who: string;
  country: string;
  // text có placeholder {{n}} đánh dấu vị trí chỗ trống
  text: string;
  blanksCount: number;
};

export type StructureRule = {
  title: string;
  paragraphs: string[];
  examples: string[];
};

export type TopicData = {
  id: string;
  title: string;
  icon: string;
  audioTitle: string;
  audioDesc: string;
  fibRows: FibRow[];
  wordBank: string[];
  translations: string[];
  structures: StructureRule[];
  speakingPrompts: string[];
  glossary: [string, string][];
  mindmapSvg: string;
};

export const TOPICS: TopicData[] = [
  {
    id: "houses",
    title: "My Dream House",
    icon: "\ud83c\udfe1",
    audioTitle: "Nghe bài \"My Dream House\" trước khi làm bài",
    audioDesc: "Nghe 6 người ở 6 quốc gia khác nhau mô tả ngôi nhà mơ ước của họ.",
    fibRows: [
    { who: "Samir", country: "Sweden", text: "My dream house is on the beach. You {{1}} the ocean and the beach. It should be a big house with maybe {{2}}, three cars, and a cinema.", blanksCount: 2 },
    { who: "Cheryl", country: "Guam", text: "My dream house would be {{1}}. It would have really {{2}} because I like places that are {{3}}. It would also have {{4}} and a big balcony.", blanksCount: 4 },
    { who: "Emily", country: "Djibouti", text: "I don't want a big house, just as long as it's {{1}}. I prefer quiet places where I can meditate.", blanksCount: 1 },
    { who: "Demelza", country: "Australia", text: "My dream house would be {{1}}, made of {{2}} and {{3}}, with a Thai style decor.", blanksCount: 3 },
    { who: "Hoa", country: "Vietnam", text: "I would like my house near the beach. It should have {{1}} so I can have a view of the ocean, and it should be {{2}} to stay away from the noise.", blanksCount: 2 }
    ],
    wordBank: ["have a great view of", "an elevator", "next to the ocean", "high ceilings", "airy and spacious", "a jacuzzi", "surrounded by nature", "two stories high", "wooden floor boards", "plain white walls", "a lot of windows", "far away from the city"],
    translations: ["1. Nhà mơ ước của tôi sẽ nằm ngay cạnh đại dương (next to the ocean).", "2. Nó sẽ có trần nhà rất cao (high ceilings) vì tôi thích những nơi thoáng đãng và rộng rãi (airy and spacious).", "3. Tôi sẽ không chọn một ngôi nhà quá lớn, miễn là nó được bao quanh bởi thiên nhiên (surrounded by nature).", "4. Nhà mơ ước của tôi sẽ cao hai tầng (two stories high), được làm từ sàn gỗ (wooden floor boards) và tường trắng đơn giản (plain white walls).", "5. Nó sẽ không ở gần thành phố ồn ào — nó sẽ ở rất xa thành phố (far away from the city)."],
    structures: [
    { title: "1. WOULD để nói về mong ước / giả định (not real now)", paragraphs: ["Dùng would khi diễn tả điều mình mong muốn/tưởng tượng, không phải sự thật hiện tại — rất hay dùng khi nói về \"dream house\", \"dream job\"..."], examples: [] },
    { title: "2. AS LONG AS + mệnh đề (điều kiện duy nhất cần có)", paragraphs: ["Dùng as long as để nói \"miễn là / chỉ cần\" — nêu điều kiện quan trọng nhất, bỏ qua các yếu tố khác."], examples: [] }
    ],
    speakingPrompts: ["Ngôi nhà mơ ước của em ở đâu? (near the beach / surrounded by nature / next to...)", "Nó trông như thế nào? (two stories high / high ceilings / a lot of windows...)", "Em muốn có gì trong nhà? (a jacuzzi / an elevator / a cinema...)", "Dùng cấu trúc \"would\" hoặc \"as long as\" ít nhất 1 lần."],
    glossary: [["have a great view of", "có tầm nhìn đẹp ra"], ["an elevator", "thang máy"], ["next to the ocean", "ngay cạnh đại dương"], ["high ceilings", "trần nhà cao"], ["airy and spacious", "thoáng đãng và rộng rãi"], ["a jacuzzi / hot tub", "bồn tắm sục / bồn nước nóng"], ["surrounded by nature", "được bao quanh bởi thiên nhiên"], ["two stories high", "cao hai tầng"], ["wooden floor boards", "sàn ván gỗ"], ["plain white walls", "tường trắng đơn giản"], ["a lot of windows", "nhiều cửa sổ"], ["far away from the city", "cách xa thành phố"]],
    mindmapSvg: `<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
        <line x1="450" y1="310" x2="450" y2="80" stroke="#3b5bfd" stroke-width="3"/>
        <line x1="450" y1="310" x2="649" y2="195" stroke="#2ec27e" stroke-width="3"/>
        <line x1="450" y1="310" x2="649" y2="425" stroke="#c98a00" stroke-width="3"/>
        <line x1="450" y1="310" x2="450" y2="540" stroke="#e8483c" stroke-width="3"/>
        <line x1="450" y1="310" x2="251" y2="425" stroke="#8a4bd8" stroke-width="3"/>
        <line x1="450" y1="310" x2="251" y2="195" stroke="#0aa6a6" stroke-width="3"/>

        <rect x="335" y="57" width="230" height="46" rx="23" fill="#3b5bfd"/>
        <text x="450" y="85" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">📍 LOCATION</text>
        <text x="450" y="125" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">next to the ocean · surrounded by nature</text>
        <text x="450" y="143" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">far away from the city</text>

        <rect x="534" y="172" width="230" height="46" rx="23" fill="#2ec27e"/>
        <text x="649" y="200" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🏠 STRUCTURE</text>
        <text x="649" y="240" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">two stories high</text>
        <text x="649" y="258" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">high ceilings · a lot of windows</text>
        <text x="649" y="276" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">wooden floor boards</text>

        <rect x="534" y="402" width="230" height="46" rx="23" fill="#c98a00"/>
        <text x="649" y="430" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🎨 DECOR</text>
        <text x="649" y="470" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">plain white walls</text>
        <text x="649" y="488" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">Thai style decor · airy and spacious</text>

        <rect x="335" y="517" width="230" height="46" rx="23" fill="#e8483c"/>
        <text x="450" y="545" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">✨ FEATURES</text>
        <text x="450" y="585" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">a jacuzzi · an elevator · a big balcony</text>

        <rect x="136" y="402" width="230" height="46" rx="23" fill="#8a4bd8"/>
        <text x="251" y="430" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🌊 VIEW</text>
        <text x="251" y="470" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">have a great view of the ocean</text>

        <rect x="136" y="172" width="230" height="46" rx="23" fill="#0aa6a6"/>
        <text x="251" y="200" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🧘 FEEL</text>
        <text x="251" y="240" text-anchor="middle" font-size="12" fill="#0aa6a6" font-family="Segoe UI, Arial">quiet · meditate</text>
        <text x="251" y="258" text-anchor="middle" font-size="12" fill="#0aa6a6" font-family="Segoe UI, Arial">airy and spacious</text>

        <!-- Tâm vẽ sau cùng để không bị các nhánh đè lên -->
      
<circle cx="450" cy="310" r="80" fill="#ff5c9a"/>
        <text x="450" y="303" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">MY</text>
        <text x="450" y="326" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">DREAM HOUSE</text>
      </svg>`,
  },
  {
    id: "food",
    title: "My Favorite Food",
    icon: "\ud83c\udf5c",
    audioTitle: "Nghe bài \"My Favorite Food\" trước khi làm bài",
    audioDesc: "Nghe 6 người chia sẻ về món ăn yêu thích của họ và lý do vì sao.",
    fibRows: [
    { who: "Adrienne", country: "USA", text: "I don't have a favorite food that I would eat every day for the rest of my life. I do like {{1}} though, so anything spicy is good for me — Mexican, Indian, Vietnamese, Thai are all {{2}} because they are particularly spicy.", blanksCount: 2 },
    { who: "Phil", country: "England", text: "My favorite food is Okonomoyaki, a Japanese food {{1}} an English pancake, but with cabbage, meat, and egg {{2}}. In the restaurant you cook it in front of yourself. I also like paella, {{3}} which has yellow rice and lots of seafood.", blanksCount: 3 },
    { who: "Barbara", country: "Australia", text: "These days I really love fruit, especially grapes and avocados. In the past I liked Italian food but these days I'm trying to be more healthy so I {{1}}.", blanksCount: 1 },
    { who: "Lisa", country: "Canada", text: "My favorite foods are bagels with cream cheese, Greek souvlaki really {{1}}, with tzatziki and nice {{2}} chicken, and a great {{3}}.", blanksCount: 3 },
    { who: "Skip", country: "USA", text: "I suppose I would have to say curry — Thai curry especially. I like Mexican food too. I guess {{1}} it would be curry.", blanksCount: 1 }
    ],
    wordBank: ["spicy food", "some of my favorites", "similar to", "mixed together", "which is Spanish food", "cut that out", "heavy on the garlic", "succulent", "grilled steak", "spicy food in general"],
    translations: ["1. Tôi rất thích đồ ăn cay (spicy food) — món Mexico, Ấn Độ, Việt Nam đều là những món tôi thích nhất (some of my favorites).", "2. Okonomoyaki khá giống với (similar to) bánh xèo kiểu Anh, với bắp cải, thịt và trứng trộn lẫn với nhau (mixed together).", "3. Tôi từng thích đồ ăn Ý, nhưng bây giờ tôi đã bỏ hẳn (cut that out) để ăn uống lành mạnh hơn.", "4. Món souvlaki của tôi rất nhiều tỏi (heavy on the garlic), ăn kèm thịt gà mềm và mọng nước (succulent).", "5. Nếu phải chọn một món, tôi sẽ chọn cà ri — nói chung tôi thích đồ ăn cay (spicy food in general)."],
    structures: [
    { title: "1. WOULD HAVE TO / WOULD SAY để đưa ra lựa chọn khó", paragraphs: ["Dùng would have to say khi phải chọn một đáp án dù không chắc chắn — rất hay dùng để trả lời câu hỏi \"món ăn yêu thích của bạn là gì?\""], examples: [] },
    { title: "2. PARTICULARLY / ESPECIALLY để nhấn mạnh lý do thích", paragraphs: ["Dùng particularly hoặc especially để nhấn mạnh điểm nổi bật nhất của món ăn."], examples: [] }
    ],
    speakingPrompts: ["Món ăn yêu thích của em là gì? (spicy food / grilled steak / dumplings...)", "Vì sao em thích món đó? (similar to / heavy on the garlic / succulent...)", "Món đó thường ăn kèm với gì?", "Dùng cấu trúc \"would have to say\" hoặc \"particularly/especially\" ít nhất 1 lần."],
    glossary: [["spicy food", "đồ ăn cay"], ["some of my favorites", "một trong những món tôi thích nhất"], ["similar to", "tương tự như, giống với"], ["mixed together", "trộn lẫn với nhau"], ["cut that out", "bỏ hẳn (thói quen/món ăn) đi"], ["heavy on the garlic", "nhiều tỏi"], ["succulent", "mềm và mọng nước (thịt)"], ["grilled steak", "bít tết nướng"], ["in general", "nói chung"], ["curry", "món cà ri"]],
    mindmapSvg: `<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
        <line x1="450" y1="310" x2="450" y2="80" stroke="#e8483c" stroke-width="3"/>
        <rect x="335" y="57" width="230" height="46" rx="23" fill="#e8483c"/>
        <text x="450" y="85" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🌶️ FLAVOR</text>
        <text x="450" y="125" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">spicy food · heavy on the garlic</text>
        <text x="450" y="143" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">in general</text>
        <line x1="450" y1="310" x2="669" y2="239" stroke="#3b5bfd" stroke-width="3"/>
        <rect x="554" y="216" width="230" height="46" rx="23" fill="#3b5bfd"/>
        <text x="669" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🍲 DISH TYPE</text>
        <text x="669" y="284" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">curry · grilled steak</text>
        <text x="669" y="302" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">dumplings (guoza)</text>
        <line x1="450" y1="310" x2="585" y2="496" stroke="#2ec27e" stroke-width="3"/>
        <rect x="470" y="473" width="230" height="46" rx="23" fill="#2ec27e"/>
        <text x="585" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🥗 TEXTURE</text>
        <text x="585" y="541" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">succulent</text>
        <text x="585" y="559" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">mixed together</text>
        <line x1="450" y1="310" x2="315" y2="496" stroke="#8a4bd8" stroke-width="3"/>
        <rect x="200" y="473" width="230" height="46" rx="23" fill="#8a4bd8"/>
        <text x="315" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🌍 ORIGIN</text>
        <text x="315" y="541" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">similar to (Japanese/Spanish)</text>
        <text x="315" y="559" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">Mexican · Thai · Greek</text>
        <line x1="450" y1="310" x2="231" y2="239" stroke="#c98a00" stroke-width="3"/>
        <rect x="116" y="216" width="230" height="46" rx="23" fill="#c98a00"/>
        <text x="231" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">❤️ PREFERENCE</text>
        <text x="231" y="284" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">some of my favorites</text>
        <text x="231" y="302" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">cut that out</text>
      
<circle cx="450" cy="310" r="80" fill="#ff5c9a"/>
        <text x="450" y="303" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">MY</text>
        <text x="450" y="326" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">FAVORITE FOOD</text>
      </svg>`,
  },
  {
    id: "firstjob",
    title: "My First Part-time Job",
    icon: "\ud83d\udcbc",
    audioTitle: "Nghe bài \"My First Part-time Job\" trước khi làm bài",
    audioDesc: "Nghe 6 người kể về công việc bán thời gian đầu tiên của họ.",
    fibRows: [
    { who: "Eucharia", country: "Ireland", text: "My first {{1}} was washing dishes in a restaurant. It wasn't very {{2}}, but it was {{3}}, and it taught me {{4}}.", blanksCount: 4 },
    { who: "Tres", country: "USA", text: "I worked for a {{1}} museum for children, running a laser light show and giving tours. It was fun seeing kids {{2}} mathematics and science.", blanksCount: 2 },
    { who: "Jeannie", country: "USA", text: "My first job was as a cashier. I hated it because I had to {{1}} for basically eight hours a day dealing with people who don't appreciate the job.", blanksCount: 1 },
    { who: "Alan", country: "Canada", text: "My first job was at McDonald's, {{1}} and doing fries. I enjoyed it for a while, but then I started {{2}}, and after six months I quit.", blanksCount: 2 },
    { who: "Kate", country: "New Zealand", text: "I worked at a bakery selling bread to customers. The best part was that at the end of the day, all the {{1}}, we could take home to our families.", blanksCount: 1 },
    { who: "Mark", country: "USA", text: "I worked at Chucky Cheese. Sometimes I was a waiter, but sometimes I got to {{1}} — a big mouse costume — entertaining little kids.", blanksCount: 1 }
    ],
    wordBank: ["part-time job", "glamorous", "hard physical labor", "the value of money", "hands-on, science and math", "open their eyes to", "stand on my feet", "flipping burgers", "losing interest in it", "leftover bread", "dress up as Chucky"],
    translations: ["1. Công việc bán thời gian (part-time job) đầu tiên của tôi không hề hào nhoáng (glamorous), nhưng nó dạy tôi giá trị của đồng tiền (the value of money).", "2. Tôi đã làm việc tại một bảo tàng khoa học thực hành (hands-on) và giúp trẻ em mở mang tầm mắt về (open their eyes to) toán học.", "3. Tôi ghét công việc đó vì phải đứng suốt (stand on my feet) tám tiếng mỗi ngày.", "4. Tôi thích công việc chiên bánh burger (flipping burgers) lúc đầu, nhưng sau đó tôi dần mất hứng thú với nó (losing interest in it).", "5. Phần hay nhất là chúng tôi được mang bánh mì thừa (leftover bread) về nhà cho gia đình."],
    structures: [
    { title: "1. IT TAUGHT ME + danh từ (bài học rút ra từ công việc)", paragraphs: ["Dùng cấu trúc này để nói công việc đã dạy cho mình điều gì — rất hay dùng khi kể về trải nghiệm làm việc đầu tiên."], examples: [] },
    { title: "2. START + V-ING (bắt đầu một quá trình thay đổi cảm xúc)", paragraphs: ["Dùng start + V-ing để diễn tả sự thay đổi dần dần trong cảm xúc/thái độ theo thời gian."], examples: [] }
    ],
    speakingPrompts: ["Công việc bán thời gian đầu tiên của em là gì (hoặc em muốn làm gì)?", "Công việc đó có khó không? (hard physical labor / stand on my feet...)", "Em học được điều gì từ công việc đó? (taught me...)", "Dùng cấu trúc \"it taught me\" hoặc \"start + V-ing\" ít nhất 1 lần."],
    glossary: [["part-time job", "công việc bán thời gian"], ["glamorous", "hào nhoáng, sang trọng"], ["hard physical labor", "lao động chân tay vất vả"], ["the value of money", "giá trị của đồng tiền"], ["hands-on museum", "bảo tàng thực hành, tương tác"], ["open their eyes to", "mở mang tầm mắt cho ai về điều gì"], ["stand on my feet", "đứng (làm việc) suốt"], ["flipping burgers", "chiên/lật bánh burger"], ["lose interest in", "mất hứng thú với"], ["leftover bread", "bánh mì thừa/còn lại"], ["dress up as", "hóa trang thành, mặc trang phục thành"]],
    mindmapSvg: `<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
        <line x1="450" y1="310" x2="450" y2="80" stroke="#e8483c" stroke-width="3"/>
        <rect x="335" y="57" width="230" height="46" rx="23" fill="#e8483c"/>
        <text x="450" y="85" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">💪 EFFORT</text>
        <text x="450" y="125" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">hard physical labor</text>
        <text x="450" y="143" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">stand on my feet</text>
        <line x1="450" y1="310" x2="669" y2="239" stroke="#3b5bfd" stroke-width="3"/>
        <rect x="554" y="216" width="230" height="46" rx="23" fill="#3b5bfd"/>
        <text x="669" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🎓 LESSON</text>
        <text x="669" y="284" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">taught me the value of money</text>
        <text x="669" y="302" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">open their eyes to</text>
        <line x1="450" y1="310" x2="585" y2="496" stroke="#2ec27e" stroke-width="3"/>
        <rect x="470" y="473" width="230" height="46" rx="23" fill="#2ec27e"/>
        <text x="585" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🍔 TASKS</text>
        <text x="585" y="541" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">flipping burgers</text>
        <text x="585" y="559" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">dress up as Chucky</text>
        <line x1="450" y1="310" x2="315" y2="496" stroke="#c98a00" stroke-width="3"/>
        <rect x="200" y="473" width="230" height="46" rx="23" fill="#c98a00"/>
        <text x="315" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">😐 FEELING</text>
        <text x="315" y="541" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">not glamorous</text>
        <text x="315" y="559" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">lose interest in</text>
        <line x1="450" y1="310" x2="231" y2="239" stroke="#8a4bd8" stroke-width="3"/>
        <rect x="116" y="216" width="230" height="46" rx="23" fill="#8a4bd8"/>
        <text x="231" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🎁 PERKS</text>
        <text x="231" y="284" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">leftover bread to take home</text>
      
<circle cx="450" cy="310" r="80" fill="#ff5c9a"/>
        <text x="450" y="303" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">MY FIRST</text>
        <text x="450" y="326" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">PART-TIME JOB</text>
      </svg>`,
  },
  {
    id: "travel",
    title: "Places I Want to Visit",
    icon: "\u2708\ufe0f",
    audioTitle: "Nghe bài \"Places I Want to Visit\" trước khi làm bài",
    audioDesc: "Nghe 6 người chia sẻ về đất nước họ muốn ghé thăm nhất và lý do.",
    fibRows: [
    { who: "Martin", country: "USA", text: "The one country I would most like to visit is New Zealand. It looks like an {{1}} country, especially after seeing Lord of the Rings. I've never been {{2}} and I'd like to see if the water flushes in reverse.", blanksCount: 2 },
    { who: "Akane", country: "Canada", text: "One country I'd like to visit is France. My parents went there on their {{1}} and have very good memories, so it would be nice to {{2}}.", blanksCount: 2 },
    { who: "Todd", country: "USA", text: "I'd love to visit Canada. {{1}}, Canada is our neighbor and I've never been there, even though I've been to many countries.", blanksCount: 1 },
    { who: "Naomi", country: "Australia", text: "I'd love to visit Vietnam. I've seen a lot of {{1}} of Vietnam on television and it looks beautiful — relaxing {{2}} through the lagoons.", blanksCount: 2 },
    { who: "Ruth", country: "England", text: "I'd really like to visit Malawi. My mom used to work there and I've seen some of her photos and it looks amazing.", blanksCount: 0 },
    { who: "Simon", country: "Canada", text: "I'd like to visit Cuba again. It has {{1}} weather, interesting Latin culture and music, plus the {{2}}.", blanksCount: 2 }
    ],
    wordBank: ["absolutely gorgeous", "south of the equator", "honeymoon", "get some practice", "believe it or not", "footage", "boat cruises", "tropical weather", "architecture"],
    translations: ["1. New Zealand trông tuyệt đẹp (absolutely gorgeous) và tôi chưa bao giờ đến phía nam đường xích đạo (south of the equator).", "2. Bố mẹ tôi đã đi tuần trăng mật (honeymoon) ở Pháp, nên tôi muốn đi để luyện tập thêm (get some practice) tiếng Pháp.", "3. Tin hay không thì tùy (believe it or not), tôi rất muốn đến Canada dù tôi đã đi rất nhiều nước.", "4. Tôi đã xem nhiều đoạn phim tư liệu (footage) về Việt Nam và muốn đi du thuyền (boat cruises) qua các đầm phá.", "5. Cuba có khí hậu nhiệt đới (tropical weather) và kiến trúc (architecture) rất thú vị."],
    structures: [
    { title: "1. THE ONE COUNTRY I WOULD MOST LIKE TO VISIT (so sánh nhất với would)", paragraphs: ["Dùng cấu trúc này để nói về nơi mình muốn đến NHẤT trong tất cả — rất phổ biến khi nói về du lịch mơ ước."], examples: [] }
    ],
    speakingPrompts: ["Đất nước em muốn đến nhất là gì? (the one country I would most like to visit...)", "Vì sao em muốn đến đó? (gorgeous / tropical weather / architecture...)", "Em đã biết gì về nơi đó rồi? (footage / honeymoon / boat cruises...)", "Dùng cấu trúc \"the one country I would most like to visit\" ít nhất 1 lần."],
    glossary: [["absolutely gorgeous", "tuyệt đẹp"], ["south of the equator", "phía nam đường xích đạo"], ["honeymoon", "tuần trăng mật"], ["get some practice", "luyện tập thêm"], ["believe it or not", "tin hay không thì tùy"], ["footage", "đoạn phim tư liệu"], ["boat cruises", "du thuyền, chuyến du ngoạn bằng thuyền"], ["tropical weather", "khí hậu nhiệt đới"], ["architecture", "kiến trúc"], ["neighbor", "nước láng giềng"]],
    mindmapSvg: `<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
        <line x1="450" y1="310" x2="450" y2="80" stroke="#2ec27e" stroke-width="3"/>
        <rect x="335" y="57" width="230" height="46" rx="23" fill="#2ec27e"/>
        <text x="450" y="85" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🌴 CLIMATE</text>
        <text x="450" y="125" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">tropical weather</text>
        <text x="450" y="143" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">south of the equator</text>
        <line x1="450" y1="310" x2="669" y2="239" stroke="#c98a00" stroke-width="3"/>
        <rect x="554" y="216" width="230" height="46" rx="23" fill="#c98a00"/>
        <text x="669" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🏛️ CULTURE</text>
        <text x="669" y="284" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">architecture</text>
        <text x="669" y="302" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">Latin culture and music</text>
        <line x1="450" y1="310" x2="585" y2="496" stroke="#3b5bfd" stroke-width="3"/>
        <rect x="470" y="473" width="230" height="46" rx="23" fill="#3b5bfd"/>
        <text x="585" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">💭 REASON</text>
        <text x="585" y="541" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">honeymoon memories</text>
        <text x="585" y="559" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">get some practice</text>
        <line x1="450" y1="310" x2="315" y2="496" stroke="#8a4bd8" stroke-width="3"/>
        <rect x="200" y="473" width="230" height="46" rx="23" fill="#8a4bd8"/>
        <text x="315" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🎬 IMPRESSION</text>
        <text x="315" y="541" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">footage on television</text>
        <text x="315" y="559" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">absolutely gorgeous</text>
        <line x1="450" y1="310" x2="231" y2="239" stroke="#e8483c" stroke-width="3"/>
        <rect x="116" y="216" width="230" height="46" rx="23" fill="#e8483c"/>
        <text x="231" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🚤 ACTIVITY</text>
        <text x="231" y="284" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">boat cruises through lagoons</text>
      
<circle cx="450" cy="310" r="80" fill="#ff5c9a"/>
        <text x="450" y="303" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">PLACES I</text>
        <text x="450" y="326" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">WANT TO VISIT</text>
      </svg>`,
  },
  {
    id: "shopping",
    title: "My Shopping Habits",
    icon: "\ud83d\udecd\ufe0f",
    audioTitle: "Nghe bài \"My Shopping Habits\" trước khi làm bài",
    audioDesc: "Nghe 6 người chia sẻ về thói quen mua sắm của họ.",
    fibRows: [
    { who: "Kate", country: "New Zealand", text: "I usually go to {{1}}, although they can be a little expensive. I also enjoy looking around {{2}}. I don't buy {{3}} that often, but I love buying jewelry.", blanksCount: 3 },
    { who: "Mark", country: "USA", text: "I don't usually like shopping. I'd rather go in, get what I want, and get out. I'm not a really big fan of {{1}}.", blanksCount: 1 },
    { who: "Jeanie", country: "USA", text: "I'm usually very {{1}} with buying things, except with jewelry — it always {{2}}, and then I end up spending too much money.", blanksCount: 2 },
    { who: "Jim", country: "England", text: "I hate shopping. I try to {{1}} because I find it so boring, and I tend to {{2}} my girlfriend to buy me clothes.", blanksCount: 2 },
    { who: "Eucharia", country: "Ireland", text: "In Ireland there are many {{1}}, with once-worn dresses, so I like shopping there. I really, really like shoe shopping.", blanksCount: 1 },
    { who: "Alan", country: "Canada", text: "I don't really like to {{1}} or {{2}}, but I do enjoy food shopping — everyone has to food shop at least once a week.", blanksCount: 2 }
    ],
    wordBank: ["department stores", "flea markets", "used clothes", "easily bored", "catches my attention", "avoid clothes shopping", "rely on", "charity shops", "browse", "window shop"],
    translations: ["1. Tôi thường đi mua sắm ở các trung tâm thương mại (department stores) và cả chợ trời (flea markets).", "2. Tôi dễ chán (easily bored) khi mua sắm, trừ khi món đồ đó thu hút sự chú ý của tôi (catches my attention).", "3. Tôi cố gắng tránh mua sắm quần áo (avoid clothes shopping) và thường dựa vào (rely on) bạn gái để mua đồ giúp.", "4. Tôi thích mua đồ ở các cửa hàng từ thiện (charity shops) vì có nhiều váy đẹp mà lạ.", "5. Tôi không thích đi dạo xem hàng (browse) hay ngắm cửa hàng (window shop), nhưng tôi thích mua đồ ăn."],
    structures: [
    { title: "1. I'D RATHER + V (thà làm gì hơn)", paragraphs: ["Dùng I'd rather + V (nguyên mẫu không \"to\") để nói về điều mình thích làm hơn — rất hay dùng khi so sánh sở thích mua sắm."], examples: [] },
    { title: "2. TEND TO + V (xu hướng thường làm)", paragraphs: ["Dùng tend to + V để nói về thói quen/xu hướng chung của bản thân."], examples: [] }
    ],
    speakingPrompts: ["Em có thích mua sắm không? Vì sao? (easily bored / catches my attention...)", "Em thường mua sắm ở đâu? (department stores / flea markets / charity shops...)", "Em thích mua loại đồ gì nhất? (jewelry / clothes / food...)", "Dùng cấu trúc \"I'd rather\" hoặc \"tend to\" ít nhất 1 lần."],
    glossary: [["department stores", "trung tâm thương mại, cửa hàng bách hóa"], ["flea markets", "chợ trời, chợ đồ cũ"], ["used clothes", "quần áo đã qua sử dụng"], ["easily bored", "dễ chán"], ["catches my attention", "thu hút sự chú ý của tôi"], ["avoid clothes shopping", "tránh mua sắm quần áo"], ["rely on", "dựa vào, nhờ cậy"], ["charity shops", "cửa hàng từ thiện"], ["browse", "xem hàng, dạo qua các gian hàng"], ["window shop", "ngắm hàng qua cửa kính (không mua)"]],
    mindmapSvg: `<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
        <line x1="450" y1="310" x2="450" y2="80" stroke="#3b5bfd" stroke-width="3"/>
        <rect x="335" y="57" width="230" height="46" rx="23" fill="#3b5bfd"/>
        <text x="450" y="85" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🏬 PLACES</text>
        <text x="450" y="125" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">department stores · flea markets</text>
        <text x="450" y="143" text-anchor="middle" font-size="12" fill="#3b5bfd" font-family="Segoe UI, Arial">charity shops</text>
        <line x1="450" y1="310" x2="669" y2="239" stroke="#e8483c" stroke-width="3"/>
        <rect x="554" y="216" width="230" height="46" rx="23" fill="#e8483c"/>
        <text x="669" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">😑 ATTITUDE</text>
        <text x="669" y="284" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">easily bored</text>
        <text x="669" y="302" text-anchor="middle" font-size="12" fill="#e8483c" font-family="Segoe UI, Arial">avoid clothes shopping</text>
        <line x1="450" y1="310" x2="585" y2="496" stroke="#c98a00" stroke-width="3"/>
        <rect x="470" y="473" width="230" height="46" rx="23" fill="#c98a00"/>
        <text x="585" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">💎 INTEREST</text>
        <text x="585" y="541" text-anchor="middle" font-size="12" fill="#c98a00" font-family="Segoe UI, Arial">catches my attention (jewelry)</text>
        <line x1="450" y1="310" x2="315" y2="496" stroke="#2ec27e" stroke-width="3"/>
        <rect x="200" y="473" width="230" height="46" rx="23" fill="#2ec27e"/>
        <text x="315" y="501" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">👀 BEHAVIOR</text>
        <text x="315" y="541" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">browse · window shop</text>
        <text x="315" y="559" text-anchor="middle" font-size="12" fill="#2ec27e" font-family="Segoe UI, Arial">rely on someone</text>
        <line x1="450" y1="310" x2="231" y2="239" stroke="#8a4bd8" stroke-width="3"/>
        <rect x="116" y="216" width="230" height="46" rx="23" fill="#8a4bd8"/>
        <text x="231" y="244" text-anchor="middle" fill="white" font-size="15" font-weight="700" font-family="Segoe UI, Arial">🛒 TYPE</text>
        <text x="231" y="284" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">used clothes</text>
        <text x="231" y="302" text-anchor="middle" font-size="12" fill="#8a4bd8" font-family="Segoe UI, Arial">food shopping</text>
      
<circle cx="450" cy="310" r="80" fill="#ff5c9a"/>
        <text x="450" y="303" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">MY</text>
        <text x="450" y="326" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Segoe UI, Arial">SHOPPING HABITS</text>
      </svg>`,
  },
];

export function getTopic(id: string): TopicData | undefined {
  return TOPICS.find((t) => t.id === id);
}