"use client";

import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">Chat AI</h2>

      <div className="bg-white border border-border rounded-lg p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={28} className="text-primary" />
        </div>
        <p className="text-sm font-medium mb-1">Trò chuyện với AI</p>
        <p className="text-xs text-muted-foreground">
          Tính năng đang được phát triển. Bạn sẽ có thể chat trực tiếp với Operisbot tại đây.
        </p>
      </div>
    </div>
  );
}
