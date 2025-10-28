/**
 * WebSocket Service for Real-time Updates
 * 
 * Simulates real-time order updates using setInterval for development.
 * In production, this would connect to a real WebSocket server.
 */

export interface WebSocketMessage {
  type: 'order_updated' | 'order_created' | 'order_deleted';
  data: any;
  timestamp: string;
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void;

class WebSocketService {
  private isConnected = false;
  private eventHandlers: Set<WebSocketEventHandler> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  /**
   * Connect to WebSocket (simulated)
   */
  connect(): void {
    if (this.isConnected) return;

    // console.log('🔌 Connecting to WebSocket (simulated)...');
    this.isConnected = true;
    this.reconnectAttempts = 0;

    // Simulate WebSocket connection with periodic updates
    this.intervalId = setInterval(() => {
      this.simulateOrderUpdate();
    }, 5000); // Check for updates every 5 seconds
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (!this.isConnected) return;

    // console.log('🔌 Disconnecting from WebSocket...');
    this.isConnected = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Add event handler
   */
  addEventListener(handler: WebSocketEventHandler): void {
    this.eventHandlers.add(handler);
  }

  /**
   * Remove event handler
   */
  removeEventListener(handler: WebSocketEventHandler): void {
    this.eventHandlers.delete(handler);
  }

  /**
   * Simulate order update (in real app, this would come from server)
   */
  private simulateOrderUpdate(): void {
    // Only simulate updates occasionally (10% chance)
    if (Math.random() > 0.1) return;

    const message: WebSocketMessage = {
      type: 'order_updated',
      data: {
        id: `order_${Date.now()}`,
        status: 'ready',
        message: 'Order status updated via WebSocket'
      },
      timestamp: new Date().toISOString()
    };

    this.broadcast(message);
  }

  /**
   * Broadcast message to all handlers
   */
  private broadcast(message: WebSocketMessage): void {
    this.eventHandlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        // console.error('Error in WebSocket event handler:', error);
      }
    });
  }

  /**
   * Send message to server (simulated)
   */
  send(message: any): void {
    if (!this.isConnected) {
      // console.warn('WebSocket not connected, cannot send message');
      return;
    }

    // console.log('📤 Sending WebSocket message:', message);
    // In real app, this would send to actual WebSocket
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
export default websocketService;
