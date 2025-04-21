
/**
 * Configuration settings for QR Code functionality throughout the application
 */
export const QR_CONFIG = {
  // QR Code generation settings
  generation: {
    errorCorrectionLevel: 'H', // High - allows recovery of up to 30% of data
    margin: 1,
    scale: 8,
    color: {
      dark: '#000000',
      light: '#ffffff',
    }
  },
  
  // QR Code scanner settings
  scanner: {
    scanInterval: 500, // milliseconds between scans
    highlightColor: 'rgba(0, 128, 255, 0.5)',
    highlightBorderColor: '#2563eb',
    maxRetries: 3,
    showDebugInfo: false
  },
  
  // Data format for different QR types
  dataFormat: {
    // Format for employee badges
    employee: {
      prefix: 'EMP',
      includeTimestamp: true,
      encryptionEnabled: true
    },
    // Format for equipment
    equipment: {
      prefix: 'EQP',
      includeTimestamp: true,
      includeSerialNumber: true
    },
    // Format for EPIs
    epi: {
      prefix: 'EPI',
      includeTimestamp: true,
      includeExpirationDate: true
    },
    // Format for tools
    tool: {
      prefix: 'TOOL',
      includeTimestamp: true,
      includeMaintenanceDate: true
    },
    // Format for materials
    material: {
      prefix: 'MAT',
      includeTimestamp: true,
      includeBatchNumber: true
    }
  },
  
  // Biometric settings
  biometric: {
    facial: {
      detectionConfidence: 0.8,
      recognitionThreshold: 0.6,
      maxFaces: 1
    },
    fingerprint: {
      minQuality: 0.7,
      matchThreshold: 0.8
    }
  }
};

/**
 * Helper function to generate QR code data based on entity type
 */
export const generateQRData = (entityType: 'employee' | 'equipment' | 'epi' | 'tool' | 'material', entityId: string, additionalData?: Record<string, any>): string => {
  const format = QR_CONFIG.dataFormat[entityType];
  const timestamp = format.includeTimestamp ? Date.now() : undefined;
  
  const qrData = {
    type: format.prefix,
    id: entityId,
    timestamp,
    ...additionalData
  };
  
  // Convert to string and optionally encrypt (simplified for demonstration)
  const qrString = JSON.stringify(qrData);
  
  if (entityType === 'employee' && format.encryptionEnabled) {
    // Simple encoding for demonstration - in production use proper encryption
    return btoa(qrString);
  }
  
  return qrString;
};

/**
 * Helper function to parse QR code data and determine the entity type
 */
export const parseQRData = (qrString: string): { type: string; entityId: string; data: any } | null => {
  try {
    // Try to decode if it's base64 (for employee badges)
    let decodedString = qrString;
    try {
      if (qrString.match(/^[A-Za-z0-9+/=]+$/)) {
        decodedString = atob(qrString);
      }
    } catch (e) {
      // Not base64, continue with original string
    }
    
    // Parse the data
    const data = JSON.parse(decodedString);
    
    // Check if it has the required format
    if (!data.type || !data.id) {
      return null;
    }
    
    // Determine entity type from prefix
    let type: string;
    if (data.type.startsWith('EMP')) type = 'employee';
    else if (data.type.startsWith('EQP')) type = 'equipment';
    else if (data.type.startsWith('EPI')) type = 'epi';
    else if (data.type.startsWith('TOOL')) type = 'tool';
    else if (data.type.startsWith('MAT')) type = 'material';
    else type = 'unknown';
    
    return {
      type,
      entityId: data.id,
      data
    };
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
};
