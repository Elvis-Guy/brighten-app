#!/usr/bin/env python3
"""
Simple script to test the Brighten API
Run this to verify your API is working before testing through the frontend
"""

import requests
import json
import time

# API URL
API_URL = "https://brighten-api.onrender.com"


def test_health_check():
    """Test the /health endpoint"""
    print("🏥 Testing /health endpoint...")
    try:
        response = requests.get(f"{API_URL}/health", timeout=10)
        print(f"Status: {response.status_code}")

        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"   Model loaded: {data.get('model_loaded', 'Unknown')}")
            print(f"   Model ready: {data.get('model_ready', 'Unknown')}")
            print(f"   Device: {data.get('device', 'Unknown')}")
            print(f"   Response time: {data.get('response_time', 'Unknown')}s")
            return data.get('model_ready', False)
        else:
            print(f"❌ Health check failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False


def test_simplify():
    """Test the /simplify endpoint"""
    print("\n📝 Testing /simplify endpoint...")

    test_text = """
    Photosynthesis is a complex biochemical process that occurs in plants, algae, and certain bacteria. 
    During this intricate process, these organisms utilize sunlight, carbon dioxide from the atmosphere, 
    and water from their environment to synthesize glucose and other organic compounds while simultaneously 
    releasing oxygen as a byproduct. This fundamental process is crucial for life on Earth as it provides 
    the primary source of energy for most ecosystems and maintains the atmospheric oxygen levels necessary 
    for aerobic respiration in most living organisms.
    """

    try:
        response = requests.post(
            f"{API_URL}/simplify",
            json={"text": test_text.strip()},
            headers={"Content-Type": "application/json"},
            timeout=30
        )

        print(f"Status: {response.status_code}")

        if response.status_code == 200:
            data = response.json()
            print("✅ Simplification successful!")
            print(
                f"\n📄 Original text ({data['metrics']['original_words']} words):")
            print(f"   {data['original'][:100]}...")
            print(
                f"\n✨ Simplified text ({data['metrics']['simplified_words']} words):")
            print(f"   {data['simplified']}")
            print(f"\n📊 Metrics:")
            print(f"   Processing time: {data['metrics']['processing_time']}s")
            print(
                f"   Word reduction: {data['metrics']['word_reduction_percent']}%")
            print(f"   Device used: {data['model']['device']}")
            return True
        else:
            print(f"❌ Simplification failed: {response.text}")
            return False

    except Exception as e:
        print(f"❌ Simplification error: {e}")
        return False


def main():
    print("🚀 Testing Brighten API")
    print("=" * 50)
    print(f"API URL: {API_URL}")
    print()

    # Test health check
    health_ok = test_health_check()

    if not health_ok:
        print("\n❌ Health check failed - API may not be ready")
        print("💡 Wait a few minutes for the model to load and try again")
        return

    # Test simplification
    print("\n⏳ Waiting 2 seconds before testing simplification...")
    time.sleep(2)

    simplify_ok = test_simplify()

    print("\n" + "=" * 50)
    if health_ok and simplify_ok:
        print("🎉 All tests passed! Your API is working correctly.")
        print("✅ You can now test it through your frontend")
    else:
        print("❌ Some tests failed. Check the errors above.")
    print("=" * 50)


if __name__ == "__main__":
    main()
