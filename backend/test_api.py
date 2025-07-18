#!/usr/bin/env python3
"""
Test script for the Dyslexia-Friendly Text Simplifier API
"""

import requests
import json
import time

# API configuration
API_BASE_URL = "http://localhost:5001"


def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health: {data.get('status')}")
            print(f"📱 Model ready: {data.get('model_ready')}")
            print(f"⚡ Response time: {data.get('response_time')}s")
        else:
            print(f"❌ Health check failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()


def test_simplify():
    """Test the simplify endpoint"""
    print("🧠 Testing text simplification...")

    test_text = "The derivative of a function represents the instantaneous rate of change at any given point and can be calculated using various differentiation rules."

    try:
        response = requests.post(
            f"{API_BASE_URL}/simplify",
            json={
                "text": test_text,
                "structured": True,
                "max_length": 256
            }
        )

        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success: {data.get('success')}")
            print(f"📝 Original: {data.get('original')}")
            print(f"✨ Simplified: {data.get('simplified')}")
            print(f"📊 Metrics: {data.get('metrics')}")
        else:
            print(f"❌ Simplification failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()


def test_batch():
    """Test the batch endpoint"""
    print("📚 Testing batch processing...")

    test_texts = [
        "Photosynthesis is the complex biochemical process by which green plants convert light energy into chemical energy.",
        "The water cycle demonstrates how water moves around Earth through evaporation, condensation, and precipitation."
    ]

    try:
        response = requests.post(
            f"{API_BASE_URL}/batch",
            json={
                "texts": test_texts,
                "structured": True
            }
        )

        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success: {data.get('success')}")
            print(f"📊 Summary: {data.get('summary')}")
            print(f"📝 Results count: {len(data.get('results', []))}")
        else:
            print(f"❌ Batch processing failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()


def test_info():
    """Test the info endpoint"""
    print("ℹ️ Testing model info...")
    try:
        response = requests.get(f"{API_BASE_URL}/info")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Model: {data.get('model_name')}")
            print(f"📱 Device: {data.get('device')}")
            print(f"🎯 Features: {len(data.get('features', []))}")
        else:
            print(f"❌ Info failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()


def main():
    """Run all tests"""
    print("🧪 Testing Dyslexia-Friendly Text Simplifier API")
    print("=" * 50)
    print(f"🌐 API Base URL: {API_BASE_URL}")
    print()

    # Run tests
    test_health_check()
    test_info()
    test_simplify()
    test_batch()

    print("🎉 Testing completed!")


if __name__ == '__main__':
    main()
