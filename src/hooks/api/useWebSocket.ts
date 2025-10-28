/**
 * WebSocket Hook for Real-time Updates
 * 
 * Provides a React hook interface for WebSocket connections
 * with automatic cleanup and error handling.
 */

import { useEffect, useCallback, useRef } from 'react';
import { websocketService, WebSocketMessage, WebSocketEventHandler } from '@/services/api/websocketService';

export interface UseWebSocketOptions {
  autoConnect?: boolean;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Error) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  send: (message: any) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    autoConnect = true,
    onMessage,
    onError,
    onConnect,
    onDisconnect
  } = options;

  const isConnected = websocketService.getConnectionStatus();
  const handlersRef = useRef<WebSocketEventHandler[]>([]);

  // Message handler
  const handleMessage = useCallback((message: WebSocketMessage) => {
    try {
      onMessage?.(message);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMessage, onError]);

  // Connect handler
  const handleConnect = useCallback(() => {
    onConnect?.();
  }, [onConnect]);

  // Disconnect handler
  const handleDisconnect = useCallback(() => {
    onDisconnect?.();
  }, [onDisconnect]);

  // Connect function
  const connect = useCallback(() => {
    try {
      websocketService.connect();
      handleConnect();
    } catch (error) {
      onError?.(error as Error);
    }
  }, [handleConnect, onError]);

  // Disconnect function
  const disconnect = useCallback(() => {
    try {
      websocketService.disconnect();
      handleDisconnect();
    } catch (error) {
      onError?.(error as Error);
    }
  }, [handleDisconnect, onError]);

  // Send function
  const send = useCallback((message: any) => {
    try {
      websocketService.send(message);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onError]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Add message handler
  useEffect(() => {
    if (onMessage) {
      websocketService.addEventListener(handleMessage);
      const currentHandlers = handlersRef.current;
      currentHandlers.push(handleMessage);

      return () => {
        websocketService.removeEventListener(handleMessage);
        const index = currentHandlers.indexOf(handleMessage);
        if (index > -1) {
          currentHandlers.splice(index, 1);
        }
      };
    }
  }, [handleMessage, onMessage]);

  return {
    isConnected,
    connect,
    disconnect,
    send
  };
}
