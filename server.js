const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'AirTracker Backend is running!' });
});

// Generate EPB bullets endpoint
app.post('/api/generate-bullets', async (req, res) => {
  try {
    const { entries } = req.body;

    if (!entries || entries.length === 0) {
      return res.status(400).json({ error: 'No entries provided' });
    }

    // Organize entries by category
    const organized = {
      performance: entries.filter(e => e.category === 'performance'),
      leadership: entries.filter(e => e.category === 'leadership'),
      training: entries.filter(e => e.category === 'training'),
      other: entries.filter(e => e.category === 'other')
    };

    // Build the prompt
    const prompt = `You are an Air Force EPB (Enlisted Performance Brief) writing expert. Convert the following logged accomplishments into proper EPB bullet format.

CRITICAL FORMATTING RULES:
- Each bullet must be 115 characters or less
- Start with strong action verb
- Use em-dash (--) to separate action from impact
- Include metrics/numbers when possible
- Use proper abbreviations (tm=team, prsnl=personnel, ops=operations, f/=for)
- Show quantifiable impact
- End with broader significance

STRICT SYNTHESIS RULES (ANTI-HALLUCINATION):
- You MAY combine entries with IDENTICAL or VERY SIMILAR action verbs only (e.g., "fixed 56" + "fixed 45" = "fixed 101")
- You MAY add numbers from multiple entries when actions are the same
- You CANNOT invent new tasks, actions, or outcomes not explicitly stated in the entries
- You CANNOT exceed the number of original entries (if user logged 2 entries, create maximum 2 bullets)
- Every bullet MUST cite which entry/entries it came from
- If uncertain whether to combine, create SEPARATE bullets instead
- Do NOT add training, mentoring, or other actions unless specifically mentioned
- Do NOT embellish or add details beyond what was logged
- When in doubt, be literal and conservative with the original entry text

ACCOMPLISHMENTS BY CATEGORY:

JOB PERFORMANCE (Section IV - Key Duties):
${organized.performance.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

LEADERSHIP (Section VI):
${organized.leadership.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

SELF-IMPROVEMENT (Section V):
${organized.training.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

OTHER:
${organized.other.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

Generate bullets for each category that has entries. For each bullet, show:
1. The bullet text (must be ≤115 chars)
2. Character count
3. Which logged accomplishment(s) it's based on

IMPORTANT: Create NO MORE bullets than the number of entries logged. If there are 2 entries, create maximum 2 bullets (only combine if actions are identical).

Format as JSON:
{
  "performance": [{"bullet": "text here", "chars": 98, "source": "description"}],
  "leadership": [...],
  "training": [...]
}

Only include categories that have logged entries.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to generate bullets',
        details: errorData 
      });
    }

    const data = await response.json();
    const resultText = data.content.find(c => c.type === 'text')?.text || '';

    // Try to parse JSON from response
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const bullets = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, bullets });
      } catch (parseError) {
        // If JSON parsing fails, return raw text
        return res.json({ success: true, raw: resultText });
      }
    } else {
      return res.json({ success: true, raw: resultText });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AirTracker backend running on port ${PORT}`);
});
    };

    // Build the prompt
    const prompt = `You are an Air Force EPB (Enlisted Performance Brief) writing expert. Convert the following logged accomplishments into proper EPB bullet format.

CRITICAL FORMATTING RULES:
- Each bullet must be 115 characters or less
- Start with strong action verb
- Use em-dash (--) to separate action from impact
- Include metrics/numbers when possible
- Use proper abbreviations (tm=team, prsnl=personnel, ops=operations, f/=for)
- Show quantifiable impact
- End with broader significance

ACCOMPLISHMENTS BY CATEGORY:

JOB PERFORMANCE (Section IV - Key Duties):
${organized.performance.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

LEADERSHIP (Section VI):
${organized.leadership.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

SELF-IMPROVEMENT (Section V):
${organized.training.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

OTHER:
${organized.other.map(e => `- ${e.text} (${e.date})`).join('\n') || 'None logged'}

Generate 3-5 strong EPB bullets for each category that has entries. For each bullet, show:
1. The bullet text (must be ≤115 chars)
2. Character count
3. Which logged accomplishment(s) it's based on

Format as JSON:
{
  "performance": [{"bullet": "text here", "chars": 98, "source": "description"}],
  "leadership": [...],
  "training": [...]
}

Only include categories that have logged entries.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to generate bullets',
        details: errorData 
      });
    }

    const data = await response.json();
    const resultText = data.content.find(c => c.type === 'text')?.text || '';

    // Try to parse JSON from response
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const bullets = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, bullets });
      } catch (parseError) {
        // If JSON parsing fails, return raw text
        return res.json({ success: true, raw: resultText });
      }
    } else {
      return res.json({ success: true, raw: resultText });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AirTracker backend running on port ${PORT}`);
});
