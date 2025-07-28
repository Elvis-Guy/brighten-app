// ============================================================================
// FILE: lib/api-test.ts
// Description: Utility functions for testing and debugging the API connection
// ============================================================================

export const testAPIConnection = async (): Promise<void> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  
  console.log(`🧪 Testing API connection to: ${apiUrl}`);
  console.log('='.repeat(50));
  
  try {
    // Test 1: Basic connectivity
    console.log('📡 Test 1: Basic API connectivity...');
    const healthResponse = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`Health check status: ${healthResponse.status}`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData);
      
      // Check if model is ready
      if (healthData.model_ready === false) {
        console.warn('⚠️  Model is not ready! This is likely the cause of the error.');
        console.log('💡 Common solutions:');
        console.log('   • Check if model files exist on the server');
        console.log('   • Verify environment variables are set');
        console.log('   • Check deployment logs for model loading errors');
      } else if (healthData.model_ready === true) {
        console.log('✅ Model appears to be ready');
      }
    } else {
      console.log('❌ Health check failed');
      const errorText = await healthResponse.text();
      console.log('Health error details:', errorText);
    }
    
    console.log('-'.repeat(30));
    
    // Test 2: Simple POST to /simplify
    console.log('📡 Test 2: Testing /simplify endpoint...');
    const testResponse = await fetch(`${apiUrl}/simplify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: "This is a test message."
      })
    });
    
    console.log(`Simplify test status: ${testResponse.status}`);
    
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('✅ Simplify endpoint working:', testData);
    } else {
      console.log('❌ Simplify endpoint failed');
      const errorText = await testResponse.text();
      console.log('Error details:', errorText);
      
      // Parse and explain the error
      try {
        const errorObj = JSON.parse(errorText);
        if (errorObj.error && errorObj.error.includes('NoneType') && errorObj.error.includes('is_ready')) {
          console.log('');
          console.log('🔍 DIAGNOSIS: Model Initialization Failure');
          console.log('   The AI model failed to load on the server.');
          console.log('   This usually means:');
          console.log('   1. Model files are missing or corrupted');
          console.log('   2. Required environment variables are not set');
          console.log('   3. Model dependencies are not installed');
          console.log('   4. Insufficient memory to load the model');
          console.log('');
          console.log('🛠️  TO FIX:');
          console.log('   1. Check Render deployment logs');
          console.log('   2. Verify all environment variables');
          console.log('   3. Ensure requirements.txt includes all dependencies');
          console.log('   4. Consider upgrading Render plan for more memory');
        }
      } catch (parseError) {
        console.log('Could not parse error details');
      }
    }
    
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('🚨 API Test Failed:', error);
  }
};

export const getAPIStatus = async (): Promise<{
  url: string;
  accessible: boolean;
  status?: number;
  message?: string;
}> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  
  try {
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      timeout: 10000 // 10 second timeout
    } as RequestInit);
    
    return {
      url: apiUrl,
      accessible: response.ok,
      status: response.status,
      message: response.ok ? 'API is accessible' : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      url: apiUrl,
      accessible: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 