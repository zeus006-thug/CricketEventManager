import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
  color: string;
}

const QUICK_BANTZ = ["How's that?!", "Wide ball mate", "Drinks! 🍻", "SIX! 🎉", "What a catch!", "LBW surely!"];

const DAVE_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq1jrEPgBvlDINgolyyZEx5v9L1ZQilHtsQmNzTUfAmimWqV_1ru2lpLtC5SE6Fw8D9_icBkn7V2hCx52RB8PklJp7Quzb5vZ3Rg8K5xPlUF7C0uub0VGtm_R1hbQkBBNVlG6bQ9GzUYt_Vj2yNtS2Y4tWkKqOks8Or0ScoNm9BVPt7fgIkfc8wJD7yC89vUcsXL1rD72hcC4MIEj9uRRLYZp8txClxQhyZdkOE8L-ntOjDvpZ1DlMEemK0MMqnllGdAtJU8A4HVc';
const SARAH_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0eShQt8VmV1QgmLj5rFxzO6EyYM3Af6ZV6rP6UQq0wxEOJA7lEeVJAKqpChzmfR9Dw1KWW4nzcDQJT2DXbFhI0e9qkVS9K03RvT3czchsZN-3tECvkBouILZBoAdi_cgpCaRbiO8ZEfIcHuPJqIuwiMQuDZWq3O9Kf3X_BBmPOdUjpN_LwHsNC2uwoZRW91L3sqlrQktrMGrrS3hsU393TrACIliasiXbIGQpE4abfUSTWnraI8kN6khpOLbNG1is7pniwOohScQ';

const BOT_REPLIES = [
  "Absolute scenes! 🤯",
  "That's going all the way!",
  "Need more pies from the concession stand 😂",
  "The atmosphere is unreal tonight!",
  "Did you see that review? Terrible call!",
  "My throat is gone from screaming!",
];

export default function MeetupHub() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('kinetic_chat');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 1, sender: 'Dave', text: "Mate, that was never a no-ball. Umpire needs glasses! 👓", time: '8:42 PM', isOwn: false, avatar: DAVE_AVATAR, color: 'secondary' },
      { id: 2, sender: 'You', text: "I'm going for another round. Who wants what? 🍻", time: '8:45 PM', isOwn: true, color: 'primary' },
      { id: 3, sender: 'Sarah T.', text: "Get me a pie! I'm stuck in the merch line.", time: '8:47 PM', isOwn: false, avatar: SARAH_AVATAR, color: 'tertiary' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('kinetic_chat', JSON.stringify(messages));
  }, [messages]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: 'You',
      text: text.trim(),
      time: timeStr,
      isOwn: true,
      color: 'primary',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate a reply after a short delay
    setTimeout(() => {
      const replySender = Math.random() > 0.5 ? 'Dave' : 'Sarah T.';
      const reply: ChatMessage = {
        id: Date.now() + 1,
        sender: replySender,
        text: BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)],
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        isOwn: false,
        avatar: replySender === 'Dave' ? DAVE_AVATAR : SARAH_AVATAR,
        color: replySender === 'Dave' ? 'secondary' : 'tertiary',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200 + Math.random() * 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Timer */}
        <div className="bg-surface-container rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <h2 className="font-headline text-lg text-secondary mb-2 relative z-10">Next Over In</h2>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="font-headline text-6xl font-black text-tertiary tracking-tighter drop-shadow-[0_0_12px_rgba(255,115,74,0.4)]">0:45</span>
            <span className="text-on-surface-variant font-medium pb-2">secs</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-tertiary to-tertiary-container h-full w-[25%] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Squad Status */}
        <div className="bg-surface-container rounded-xl p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl text-primary font-bold">Squad Status</h2>
            <span className="bg-primary-container/20 text-primary text-xs font-bold px-3 py-1 rounded-full font-headline">4/5 Here</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-surface-container-high rounded-lg relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <img alt="Dave" className="w-12 h-12 rounded-full object-cover border-2 border-primary" src={DAVE_AVATAR} />
              <div className="flex-1">
                <h3 className="font-body font-bold text-on-surface">Dave "The Sledge"</h3>
                <p className="text-sm text-secondary-dim">Sec 402, Row G</p>
              </div>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 700" }}>local_bar</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-surface-container-high rounded-lg relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <img alt="Sarah" className="w-12 h-12 rounded-full object-cover border-2 border-primary" src={SARAH_AVATAR} />
              <div className="flex-1">
                <h3 className="font-body font-bold text-on-surface">Sarah T.</h3>
                <p className="text-sm text-secondary-dim">Concourse (Food)</p>
              </div>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'wght' 700" }}>fastfood</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-surface-container-low rounded-lg opacity-60">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant">person_off</span>
              </div>
              <div className="flex-1">
                <h3 className="font-body font-bold text-on-surface-variant">Mike R.</h3>
                <p className="text-sm text-on-surface-variant">Arriving in 15m</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => alert('Squad invite link copied! Share it with your mates.')}
            className="w-full mt-6 bg-surface-container-high hover:bg-surface-container-highest text-primary font-headline font-bold py-3 rounded-xl transition-colors flex justify-center items-center cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2">add_circle</span>
            Invite to Squad
          </button>
        </div>

        {/* Quick Bantz */}
        <div className="bg-surface-container rounded-xl p-6">
          <h2 className="font-headline text-sm text-secondary-dim mb-4 uppercase tracking-wider">Quick Bantz</h2>
          <div className="flex flex-wrap gap-2">
            {QUICK_BANTZ.map((bant) => (
              <button
                key={bant}
                onClick={() => sendMessage(bant)}
                className="bg-surface-container-high hover:bg-secondary/20 text-secondary border border-outline-variant/30 px-4 py-2 rounded-full font-body text-sm font-medium transition-colors cursor-pointer"
              >
                {bant}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-8 bg-surface-container rounded-xl flex flex-col h-[618px] lg:h-[calc(100vh-8rem)] relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Chat Header */}
        <div className="bg-surface-container-high p-4 flex items-center justify-between z-10 border-b border-surface-container-highest/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-on-surface">Section 402 Mob</h2>
              <p className="text-xs text-primary-dim flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary inline-block mr-1 animate-pulse"></span>
                Live Sledging
              </p>
            </div>
          </div>
          <button onClick={() => alert('Chat settings: Notifications are on.')} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-6 relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[20rem]" style={{ fontVariationSettings: "'wght' 700" }}>sports_cricket</span>
          </div>
          {messages.map((msg) =>
            msg.isOwn ? (
              <div key={msg.id} className="flex items-start justify-end max-w-[85%] self-end relative z-10">
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-xs text-on-surface-variant">{msg.time}</span>
                    <span className="font-bold text-sm text-primary">{msg.sender}</span>
                  </div>
                  <div className="bg-primary/10 text-primary-dim p-3 rounded-2xl rounded-tr-sm text-sm font-body border border-primary/20 backdrop-blur-md">
                    {msg.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start max-w-[85%] relative z-10">
                {msg.avatar && <img alt={msg.sender} className="w-8 h-8 rounded-full mt-1 mr-3 object-cover flex-shrink-0" src={msg.avatar} />}
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className={`font-bold text-sm text-${msg.color}`}>{msg.sender}</span>
                    <span className="text-xs text-on-surface-variant">{msg.time}</span>
                  </div>
                  <div className="bg-surface-container-high text-on-surface p-3 rounded-2xl rounded-tl-sm text-sm font-body">
                    {msg.text}
                  </div>
                </div>
              </div>
            )
          )}
          {/* Wicket notification example */}
          <div className="flex justify-center relative z-10 my-2">
            <div className="bg-tertiary/10 text-tertiary-fixed text-xs font-headline font-bold px-4 py-1 rounded-full border border-tertiary/20 flex items-center">
              <span className="material-symbols-outlined text-[14px] mr-1">campaign</span>
              WICKET! Smith run out (42)
            </div>
          </div>
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-surface-container-highest/80 backdrop-blur-xl border-t border-surface-container-highest z-20">
          <div className="flex items-center space-x-2">
            <button type="button" onClick={() => alert('Photo sharing coming soon!')} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low cursor-pointer flex-shrink-0">
              <span className="material-symbols-outlined">add_photo_alternate</span>
            </button>
            <div className="flex-1 relative">
              <input
                className="w-full bg-surface-container-lowest text-on-surface placeholder-on-surface-variant/50 rounded-full py-3 px-5 pr-12 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 border-none"
                placeholder="Send a sledge..."
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 700" }}>send</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
