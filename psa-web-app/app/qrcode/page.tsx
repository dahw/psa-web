'use client';

import { Card, Button, Badge } from '@/components/UI';
import QRCode from 'qrcode.react';
import { Download, Share2, Copy } from 'lucide-react';
import { useState } from 'react';

export default function QRCodePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyQR = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = (id: string) => {
    const qrElement = document.getElementById(id);
    if (qrElement) {
      const canvas = qrElement.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${id}-qr.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          QR Codes<span className="text-[#6B8E23]">.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg">Quick access to gym check-in and app downloads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gym Check-In */}
        <Card className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-6">Gym Check-In</h3>
          <div className="bg-white p-6 rounded-xl mb-6">
            <QRCode
              id="gym-checkin-qr"
              value="https://psa.fit/checkin/user123"
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-[#9CA3AF] text-sm mb-6">
            Scan this QR code when you arrive at the gym to check in
          </p>
          <div className="flex gap-3 w-full">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              onClick={() => handleDownloadQR('gym-checkin-qr')}
              className="flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download
            </Button>
            <Button
              variant="secondary"
              fullWidth
              size="sm"
              onClick={handleCopyQR}
              className="flex items-center justify-center gap-2"
            >
              <Copy size={18} /> Copy
            </Button>
          </div>
        </Card>

        {/* App Download */}
        <Card className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-6">Download App</h3>
          <div className="bg-white p-6 rounded-xl mb-6">
            <QRCode
              id="app-download-qr"
              value="https://psa.fit/download/app"
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-[#9CA3AF] text-sm mb-6">
            Share with friends so they can download the PSA app
          </p>
          <div className="flex gap-3 w-full">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              onClick={() => handleDownloadQR('app-download-qr')}
              className="flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download
            </Button>
            <Button
              variant="secondary"
              fullWidth
              size="sm"
              onClick={handleCopyQR}
              className="flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Share
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8">
        <h3 className="font-bold text-lg mb-4">How It Works</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-[#6B8E23] mb-2">Gym Check-In</h4>
            <p className="text-[#9CA3AF] text-sm">
              Use your unique check-in QR code to quickly log your gym visits. Your trainer can scan it to track your attendance and workout consistency.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#6B8E23] mb-2">Share the App</h4>
            <p className="text-[#9CA3AF] text-sm">
              Invite friends to join PSA and start their fitness journey. Share the app download QR code on social media or print it out for the gym.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#6B8E23] mb-2">Referral Rewards</h4>
            <p className="text-[#9CA3AF] text-sm">
              Earn credits for every friend who joins through your referral link. Use credits to unlock premium features and training programs.
            </p>
          </div>
        </div>
      </Card>

      {/* Status Message */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
          ✓ QR code copied to clipboard
        </div>
      )}
    </div>
  );
}
