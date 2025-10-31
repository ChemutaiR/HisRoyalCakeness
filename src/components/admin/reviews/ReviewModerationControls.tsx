"use client";

import { MessageSquare, CheckCircle, Flag } from 'lucide-react';

interface ReviewModerationControlsProps {
  onReply: () => void;
  onFeature?: () => void;
  onFlag?: () => void;
}

export default function ReviewModerationControls({
  onReply,
  onFeature,
  onFlag,
}: ReviewModerationControlsProps) {
  return (
    <div className="text-sm font-medium space-x-2">
      <button
        onClick={onReply}
        className="text-indigo-600 hover:text-indigo-900"
        title="Reply"
      >
        <MessageSquare className="w-4 h-4" />
      </button>
      {onFeature && (
        <button
          onClick={onFeature}
          className="text-green-600 hover:text-green-900"
          title="Feature"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      )}
      {onFlag && (
        <button onClick={onFlag} className="text-red-600 hover:text-red-900" title="Flag">
          <Flag className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

