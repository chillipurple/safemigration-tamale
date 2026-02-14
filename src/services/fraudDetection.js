// AI-powered fraud detection using Claude API
// For production, replace with your actual API key (store in environment variable)

const CLAUDE_API_KEY = 'your-api-key-here'; // Replace with actual key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Analyze job advertisement text for fraud indicators
export const analyzeJobAd = async (jobText, photoUrl = null) => {
  // For demo/prototype, use mock analysis if no API key
  if (CLAUDE_API_KEY === 'your-api-key-here' || !CLAUDE_API_KEY) {
    return mockAnalysis(jobText);
  }

  try {
    const prompt = `You are an expert in identifying job recruitment fraud and human trafficking tactics in West Africa, specifically Ghana. Analyze the following job advertisement and assess the risk of it being a scam or trafficking attempt.

Job Advertisement Text:
"""
${jobText}
"""

Analyze for these red flags:
1. Upfront fees (visa fees, document fees, registration fees, etc.)
2. Unrealistic salary (>$3,000/month for unskilled labor)
3. Missing company information (no address, no registration number)
4. Pressure tactics (urgency, limited spots, act now)
5. Taking of documents (passport, ID held by employer)
6. Vague job description
7. Contact via personal messaging apps (WhatsApp) instead of official channels
8. Promises of easy foreign work without proper credentials
9. Secrecy (don't tell family, confidential)
10. Unverifiable recruiter credentials

Provide your response in this exact JSON format:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "riskScore": 0-100,
  "detectedFlags": ["flag1", "flag2"],
  "analysis": "Brief explanation",
  "recommendations": ["recommendation1", "recommendation2"],
  "warningMessage": "Short warning if high risk"
}`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const analysis = JSON.parse(data.content[0].text);

    return analysis;
  } catch (error) {
    console.error('Fraud detection error:', error);
    // Fallback to mock analysis if API fails
    return mockAnalysis(jobText);
  }
};

// Mock analysis for demo purposes (used when no API key)
const mockAnalysis = (jobText) => {
  const text = jobText.toLowerCase();
  const redFlags = [];
  let riskScore = 0;

  // Check for common fraud indicators
  if (text.match(/\$\d{4,}|\d{4,}\s*(dollars|usd|cedis)/)) {
    redFlags.push('Unrealistic high salary offered');
    riskScore += 25;
  }

  if (text.match(/(pay|fee|deposit|advance|visa fee|document fee|registration|processing fee)/)) {
    redFlags.push('Upfront payment required');
    riskScore += 30;
  }

  if (text.match(/(urgent|limited|spots left|act now|today only|hurry|fast|quick)/)) {
    redFlags.push('Pressure tactics detected');
    riskScore += 15;
  }

  if (text.match(/(whatsapp|contact me|call me|dm|personal)/)) {
    redFlags.push('Using personal messaging instead of official channels');
    riskScore += 20;
  }

  if (text.match(/(passport|id card|documents|credentials).*(hold|keep|submit|send)/)) {
    redFlags.push('Requesting to hold personal documents');
    riskScore += 25;
  }

  if (!text.match(/(address|location|office|company registration|license)/)) {
    redFlags.push('Missing company verification details');
    riskScore += 15;
  }

  if (text.match(/(secret|don't tell|confidential|private|discreet)/)) {
    redFlags.push('Demands for secrecy');
    riskScore += 25;
  }

  if (text.match(/(dubai|libya|qatar|saudi|kuwait|lebanon|europe).*(easy|simple|no experience)/)) {
    redFlags.push('Foreign work with no credential requirements');
    riskScore += 20;
  }

  // Determine risk level
  let riskLevel = 'LOW';
  if (riskScore >= 60) riskLevel = 'HIGH';
  else if (riskScore >= 30) riskLevel = 'MEDIUM';

  const recommendations = [];
  let warningMessage = '';

  if (riskLevel === 'HIGH') {
    warningMessage = '⚠️ DANGER: This job ad shows multiple trafficking red flags. Do NOT respond or pay any money.';
    recommendations.push('Do not contact this recruiter');
    recommendations.push('Report to Ghana Police (191) or Trafficking Hotline (0800-100-100)');
    recommendations.push('Verify through Ghana Immigration Service verified agencies list');
  } else if (riskLevel === 'MEDIUM') {
    warningMessage = '⚠️ WARNING: This job ad has some concerning elements. Proceed with extreme caution.';
    recommendations.push('Verify company exists and is registered in Ghana');
    recommendations.push('Never pay upfront fees');
    recommendations.push('Check Ghana Immigration Service approved recruiter list');
    recommendations.push('Bring a trusted family member to any meeting');
  } else {
    recommendations.push('Still verify the company is legitimate');
    recommendations.push('Research the employer online');
    recommendations.push('Never share personal documents until job is confirmed');
  }

  return {
    riskLevel,
    riskScore,
    detectedFlags: redFlags,
    analysis: `Detected ${redFlags.length} potential red flags in this job advertisement. ${riskLevel === 'HIGH' ? 'This appears to be a high-risk fraud attempt or potential trafficking situation.' : riskLevel === 'MEDIUM' ? 'This job posting contains some concerning elements that require verification.' : 'Limited red flags detected, but still verify legitimacy before proceeding.'}`,
    recommendations,
    warningMessage
  };
};

// Extract text from image using Tesseract.js (OCR)
export const extractTextFromImage = async (imageFile) => {
  try {
    // Dynamically import Tesseract
    const Tesseract = await import('tesseract.js');

    const result = await Tesseract.recognize(
      imageFile,
      'eng',
      {
        logger: (m) => console.log(m)
      }
    );

    return result.data.text;
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to extract text from image');
  }
};
