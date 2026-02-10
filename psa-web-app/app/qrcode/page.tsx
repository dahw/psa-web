'use client';

import { Card, Button } from '@/components/UI';
import QRCode from 'qrcode.react';
import { Download, Share2, Copy } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function QRCodePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyQR = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = (id: string, filename: string) => {
    const element = document.getElementById(id);
    if (element) {
      const canvas = element.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Header with Logo */}
      <div className="mb-8 md:mb-10 flex items-center gap-3 md:gap-4">
        <Image
          src="/Workout.png"
          alt="PSA Logo"
          width={40}
          height={40}
          className="rounded-lg w-10 h-10"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            QR Codes<span className="text-[#6B8E23]">.</span>
          </h1>
          <p className="text-[#9CA3AF] text-lg md:text-xl">Quick access to gym check-in and app downloads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gym Check-In */}
        <Card className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-6">Gym Check-In</h3>
          
          {/* QR Code Container with Gradient */}
          <div 
            className="p-8 rounded-2xl mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #559207 0%, #77c600 100%)'
            }}
          >
            <div id="gym-checkin-qr" className="bg-white p-2 rounded-lg inline-block">
              <QRCode
                value="https://psa.fit/checkin/user123"
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#0A0A0A"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          <p className="text-[#9CA3AF] text-sm mb-6">
            Scan this QR code when you arrive at the gym to check in
          </p>

          <div className="flex gap-3 w-full">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              onClick={() => handleDownloadQR('gym-checkin-qr', 'gym-checkin')}
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

          {/* QR Code Container with Gradient */}
          <div 
            className="p-8 rounded-2xl mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #559207 0%, #77c600 100%)'
            }}
          >
            <div id="app-download-qr" className="bg-white p-2 rounded-lg inline-block">
              <QRCode
                value="https://psa.fit/download/app"
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#0A0A0A"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          <p className="text-[#9CA3AF] text-sm mb-6">
            Share with friends so they can download the PSA app
          </p>

          <div className="flex gap-3 w-full">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              onClick={() => handleDownloadQR('app-download-qr', 'app-download')}
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
