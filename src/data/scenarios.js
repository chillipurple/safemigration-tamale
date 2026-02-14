// Educational scenarios based on real trafficking patterns in Northern Ghana

export const scenarios = [
  {
    id: 'scenario_1',
    title: 'The Kayaye Opportunity',
    description: 'You are a 19-year-old kayaye (head porter) working in Tamale market. A well-dressed woman approaches you with a job offer.',
    imageUrl: '/scenarios/kayaye.jpg', // Placeholder
    nodes: [
      {
        id: 'start',
        text: 'A woman named Madam Grace approaches you at the market. She says: "I can see you work hard. I have connections in Libya. There are good jobs in restaurants and hotels. You can earn $1,000 every month and send money home to your family."',
        choices: [
          {
            text: 'Ask her for more details about the job',
            nextNode: 'ask_details',
            points: 10
          },
          {
            text: 'Say yes immediately - this is your big chance',
            nextNode: 'say_yes',
            points: -10
          },
          {
            text: 'Thank her but say you need to think about it',
            nextNode: 'think_about_it',
            points: 20
          }
        ]
      },
      {
        id: 'ask_details',
        text: 'You ask about the job details. She says: "You will work in a hotel as a cleaner. But first, you need to pay 5,000 cedis for travel documents and visa. I can arrange everything." She shows you photos of other girls who "went successfully".',
        choices: [
          {
            text: 'Ask why you need to pay upfront',
            nextNode: 'ask_payment',
            points: 15
          },
          {
            text: 'Borrow money from family to pay',
            nextNode: 'borrow_money',
            points: -15
          },
          {
            text: 'Ask to speak with the girls in the photos',
            nextNode: 'verify_girls',
            points: 20
          }
        ]
      },
      {
        id: 'say_yes',
        text: 'You agree immediately. Madam Grace smiles and says you need to give her 5,000 cedis for documents. She says you must leave your phone with her "for security" and cannot tell anyone where you are going.',
        choices: [
          {
            text: 'Give her the money and phone',
            nextNode: 'danger_trapped',
            points: -25
          },
          {
            text: 'Say you need to tell your family first',
            nextNode: 'tell_family',
            points: 15
          },
          {
            text: 'Walk away - this feels wrong',
            nextNode: 'safe_ending',
            points: 30
          }
        ]
      },
      {
        id: 'think_about_it',
        text: 'You say you need time to think. She says: "This opportunity won\'t last. I have many other girls interested. But you seem smart. Call me tomorrow." She gives you a phone number.',
        choices: [
          {
            text: 'Research the phone number online',
            nextNode: 'research_number',
            points: 20
          },
          {
            text: 'Talk to your family about it',
            nextNode: 'tell_family',
            points: 25
          },
          {
            text: 'Call her tomorrow and agree',
            nextNode: 'call_tomorrow',
            points: -10
          }
        ]
      },
      {
        id: 'ask_payment',
        text: 'She says: "Everyone pays for their documents. This is normal. The company will deduct it from your first salary." But she cannot give you a written contract or company name.',
        choices: [
          {
            text: 'Report this to the police hotline 191',
            nextNode: 'safe_ending',
            points: 30
          },
          {
            text: 'Pay half now, half later',
            nextNode: 'warning_partial',
            points: 0
          }
        ]
      },
      {
        id: 'borrow_money',
        text: 'You borrow 5,000 cedis from your aunt and give it to Madam Grace. She takes your phone and national ID "for processing". Days pass with no updates. When you try to find her, she has disappeared.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You have been scammed. The money is gone. This is a common trafficking tactic - demanding upfront fees and taking your documents. Never pay money or give documents to job recruiters.',
        points: -30
      },
      {
        id: 'verify_girls',
        text: 'She becomes defensive: "Why don\'t you trust me? These girls are working now, they are busy." She tries to change the subject. This is suspicious.',
        choices: [
          {
            text: 'Walk away and report to authorities',
            nextNode: 'safe_ending',
            points: 30
          },
          {
            text: 'Give her a chance and pay',
            nextNode: 'danger_trapped',
            points: -20
          }
        ]
      },
      {
        id: 'danger_trapped',
        text: 'You pay the money. Madam Grace takes you to a "travel agency" which is just a small room. Your passport is taken. You are told you now owe 15,000 cedis, not 5,000. You are trapped in a trafficking situation.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You have been trafficked. Once traffickers have your documents and money, you lose control. The debt grows. This is how many women end up in forced labor or exploitation.',
        points: -40
      },
      {
        id: 'tell_family',
        text: 'You tell your uncle about the offer. He is concerned. He knows stories of girls who went to Libya and never came back. He suggests calling the Ghana Human Trafficking Hotline: 0800-100-100.',
        choices: [
          {
            text: 'Call the hotline for advice',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'Ignore his worries - you know better',
            nextNode: 'warning_partial',
            points: -5
          }
        ]
      },
      {
        id: 'research_number',
        text: 'You use a friend\'s phone to search the number. You find reports online of this same number being used in trafficking scams. Other women lost money and were never seen again.',
        choices: [
          {
            text: 'Block the number and report it',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'Confront Madam Grace about the reports',
            nextNode: 'warning_partial',
            points: 5
          }
        ]
      },
      {
        id: 'call_tomorrow',
        text: 'You call and agree. She says: "Good! Meet me tonight. Don\'t tell anyone - people will be jealous." This secrecy is a major red flag.',
        choices: [
          {
            text: 'Meet her in secret',
            nextNode: 'danger_trapped',
            points: -25
          },
          {
            text: 'Change your mind - too many red flags',
            nextNode: 'safe_ending',
            points: 20
          }
        ]
      },
      {
        id: 'warning_partial',
        text: 'You avoided the worst danger, but you are still at risk. Madam Grace knows your phone number and may try again. Be careful who you trust.',
        ending: true,
        outcome: 'warning',
        message: 'WARNING ENDING: You made some risky choices. Always verify job offers through official channels. The Ghana Immigration Service has a list of verified labor recruitment agencies. Never pay upfront fees or keep opportunities secret from family.',
        points: 0
      },
      {
        id: 'safe_ending',
        text: 'You made the right choice! You contacted authorities or verified the offer was fake. The Human Trafficking Hotline (0800-100-100) confirms this is a known scam. You protected yourself and potentially saved others by reporting.',
        ending: true,
        outcome: 'safe',
        message: 'SAFE ENDING: Excellent decisions! You recognized red flags: upfront fees, taking your documents, secrecy, pressure to decide quickly, and unverifiable claims. You are now informed and can help protect others in your community.',
        points: 40
      }
    ]
  },
  {
    id: 'scenario_2',
    title: 'The WhatsApp Job Offer',
    description: 'You are a 22-year-old youth in Tamale. You receive a WhatsApp message about a hotel job in Dubai.',
    imageUrl: '/scenarios/whatsapp.jpg',
    nodes: [
      {
        id: 'start',
        text: 'A WhatsApp message from an unknown number: "Hello! My name is Ahmed. I work for Royal Dubai Hotel. We need waiters urgently. Salary: $2,500/month. Free accommodation. Interested? Reply YES."',
        choices: [
          {
            text: 'Reply YES immediately',
            nextNode: 'reply_yes',
            points: -10
          },
          {
            text: 'Ask how they got your number',
            nextNode: 'ask_number',
            points: 15
          },
          {
            text: 'Search "Royal Dubai Hotel" online first',
            nextNode: 'search_hotel',
            points: 20
          }
        ]
      },
      {
        id: 'reply_yes',
        text: 'Ahmed replies: "Great! Send me photo of your passport and 3,000 cedis for visa processing. We need to move fast - only 5 positions left!" He sends a photo of a fancy hotel.',
        choices: [
          {
            text: 'Send passport photo and money',
            nextNode: 'danger_scammed',
            points: -30
          },
          {
            text: 'Ask for official company email',
            nextNode: 'ask_email',
            points: 20
          },
          {
            text: 'Check if this hotel actually exists',
            nextNode: 'verify_hotel',
            points: 25
          }
        ]
      },
      {
        id: 'ask_number',
        text: 'He says: "Your friend Mohammed gave me your contact. He said you need a good job." But you don\'t know any Mohammed.',
        choices: [
          {
            text: 'This is suspicious - block the number',
            nextNode: 'safe_ending',
            points: 30
          },
          {
            text: 'Maybe Mohammed is someone from school',
            nextNode: 'continue_conversation',
            points: -5
          },
          {
            text: 'Ask him to prove he knows Mohammed',
            nextNode: 'verify_contact',
            points: 15
          }
        ]
      },
      {
        id: 'search_hotel',
        text: 'You search online. There IS a Royal Dubai Hotel, but their official website says: "Beware of job scams using our name. We never recruit via WhatsApp or charge fees. Report fraud to Dubai Police."',
        choices: [
          {
            text: 'Screenshot this and report to Ghana police',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'Tell Ahmed you know he\'s a scammer',
            nextNode: 'confront_scammer',
            points: 20
          },
          {
            text: 'Maybe this is a different branch',
            nextNode: 'danger_convinced',
            points: -15
          }
        ]
      },
      {
        id: 'danger_scammed',
        text: 'You send your passport photo and mobile money transfer. Ahmed says "received, processing visa now." Then he blocks you. Your passport photo can now be used for identity theft.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You were scammed. Your money is gone and your identity is compromised. Never send passport photos or money to unverified contacts. Real employers conduct proper interviews and never charge fees.',
        points: -35
      },
      {
        id: 'ask_email',
        text: 'He sends an email: royaldubaihotelHR@gmail.com. This is suspicious - real companies use their domain (e.g., @royaldubaihotel.com), not Gmail.',
        choices: [
          {
            text: 'Point this out and stop responding',
            nextNode: 'safe_ending',
            points: 30
          },
          {
            text: 'Email them anyway to see if it\'s real',
            nextNode: 'email_scammer',
            points: 5
          }
        ]
      },
      {
        id: 'verify_hotel',
        text: 'You find the hotel\'s real phone number and call Dubai. They say: "This is a scam. We do not recruit from Ghana. We only hire through UAE government job portals. Please report this."',
        choices: [
          {
            text: 'Report to 0800-100-100 trafficking hotline',
            nextNode: 'safe_ending',
            points: 40
          },
          {
            text: 'Just block Ahmed and move on',
            nextNode: 'warning_ending',
            points: 10
          }
        ]
      },
      {
        id: 'continue_conversation',
        text: 'Ahmed becomes pushy: "Time is running out! My boss is angry. If you want this job, pay NOW or I give it to someone else!" This pressure tactic is a major red flag.',
        choices: [
          {
            text: 'Pay to avoid losing the opportunity',
            nextNode: 'danger_scammed',
            points: -25
          },
          {
            text: 'Block him - this is clearly a scam',
            nextNode: 'safe_ending',
            points: 25
          }
        ]
      },
      {
        id: 'verify_contact',
        text: 'He cannot give you any information about "Mohammed." He changes the subject: "Forget about that. Do you want the job or not? Many people are waiting."',
        choices: [
          {
            text: 'This is manipulation - stop talking to him',
            nextNode: 'safe_ending',
            points: 30
          },
          {
            text: 'Agree to pay a small deposit to test',
            nextNode: 'warning_ending',
            points: -10
          }
        ]
      },
      {
        id: 'confront_scammer',
        text: 'You tell him you know it\'s a scam. He becomes angry and threatens you: "You will regret this. I know where you live." Then he blocks you.',
        choices: [
          {
            text: 'Report the threats to police',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'Ignore it - he\'s probably bluffing',
            nextNode: 'warning_ending',
            points: 10
          }
        ]
      },
      {
        id: 'danger_convinced',
        text: 'You convince yourself it might be real. You pay 1,500 cedis as "partial payment." Ahmed asks for the rest. When you can\'t pay, he threatens to report you to Ghana Immigration for "fraud." You are being manipulated.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You fell for the scam despite warning signs. Scammers use pressure, urgency, and threats. Real employers NEVER charge fees or threaten applicants. You have lost money and are being extorted.',
        points: -30
      },
      {
        id: 'email_scammer',
        text: 'They send a fake offer letter with spelling errors and no company letterhead. They ask for 5,000 cedis for "visa insurance bond."',
        choices: [
          {
            text: 'Pay the money',
            nextNode: 'danger_scammed',
            points: -25
          },
          {
            text: 'This is clearly fake - report it',
            nextNode: 'safe_ending',
            points: 25
          }
        ]
      },
      {
        id: 'warning_ending',
        text: 'You protected yourself from the worst, but didn\'t report the scam. Others may still fall victim to Ahmed. Always report fraud.',
        ending: true,
        outcome: 'warning',
        message: 'WARNING ENDING: You avoided being scammed but could have helped others. Report job fraud to: Ghana Police (191) or Trafficking Hotline (0800-100-100). Your report can save someone else.',
        points: 10
      },
      {
        id: 'safe_ending',
        text: 'Excellent work! You identified the scam, protected yourself, and reported it to authorities. The police can track these numbers and warn others. You may have saved many people from being scammed or trafficked.',
        ending: true,
        outcome: 'safe',
        message: 'SAFE ENDING: Perfect! You spotted red flags: WhatsApp recruitment, upfront fees, Gmail email, pressure tactics, unverifiable claims. Real international jobs require: in-person interviews, no fees, official contracts, and proper work visas through embassies.',
        points: 45
      }
    ]
  },
  {
    id: 'scenario_3',
    title: 'The Market Agent',
    description: 'You are a 25-year-old market trader in Tamale. A recruitment agent visits your stall with a "once in a lifetime" opportunity.',
    imageUrl: '/scenarios/market.jpg',
    nodes: [
      {
        id: 'start',
        text: 'A man named Mr. Yusif in business clothes comes to your stall. "I represent Gulf Star Recruitment. We place workers in Qatar for the 2026 World Cup. Security guards earn $3,500/month. I can register you today. Only 500 cedis registration fee."',
        choices: [
          {
            text: 'Pay the 500 cedis - it\'s a small risk',
            nextNode: 'pay_registration',
            points: -10
          },
          {
            text: 'Ask to see his recruitment license',
            nextNode: 'ask_license',
            points: 20
          },
          {
            text: 'Say you\'ll check with Ghana Immigration first',
            nextNode: 'check_immigration',
            points: 25
          }
        ]
      },
      {
        id: 'pay_registration',
        text: 'You pay 500 cedis. He gives you a handwritten receipt. Later, he calls: "Good news! You\'re selected. Now pay 8,000 cedis for visa, flight, and medical tests. You leave in 2 weeks."',
        choices: [
          {
            text: 'Borrow money from a loan shark to pay',
            nextNode: 'danger_debt',
            points: -25
          },
          {
            text: 'Ask for a detailed breakdown in writing',
            nextNode: 'ask_breakdown',
            points: 15
          },
          {
            text: 'Demand your 500 cedis back',
            nextNode: 'demand_refund',
            points: 10
          }
        ]
      },
      {
        id: 'ask_license',
        text: 'He shows you a laminated card with his photo. It says "Licensed Recruiter." But there\'s no license number or government stamp. You ask to verify it with the Ghana Immigration Service.',
        choices: [
          {
            text: 'Call Ghana Immigration Service to verify',
            nextNode: 'verify_license',
            points: 30
          },
          {
            text: 'The card looks official enough - proceed',
            nextNode: 'pay_registration',
            points: -15
          }
        ]
      },
      {
        id: 'check_immigration',
        text: 'You visit the Ghana Immigration Service office. They show you their website list of approved recruitment agencies. "Gulf Star Recruitment" is NOT on the list. They warn you this is a known scam targeting market workers.',
        choices: [
          {
            text: 'Report Mr. Yusif to the police',
            nextNode: 'safe_ending',
            points: 40
          },
          {
            text: 'Confront him with this information',
            nextNode: 'confront_agent',
            points: 25
          },
          {
            text: 'Maybe the list is outdated',
            nextNode: 'danger_convinced',
            points: -20
          }
        ]
      },
      {
        id: 'danger_debt',
        text: 'You borrow 8,000 cedis at 20% monthly interest. You pay Mr. Yusif. He says: "Processing takes time." Months pass. No visa. No job. He stops answering calls. You are now 12,000 cedis in debt to the loan shark.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You are trapped in debt from a scam. The loan shark may force you into exploitative work to repay. This is how trafficking often starts - with debt bondage. Seek help from the Human Trafficking Secretariat immediately: 0800-100-100.',
        points: -40
      },
      {
        id: 'ask_breakdown',
        text: 'He refuses: "This is a special package deal. Take it or leave it. I have 50 other people registered." This refusal to provide transparency is a red flag.',
        choices: [
          {
            text: 'Insist on transparency or you\'ll report him',
            nextNode: 'threaten_report',
            points: 25
          },
          {
            text: 'Fine, I\'ll pay - don\'t want to lose the spot',
            nextNode: 'danger_debt',
            points: -20
          },
          {
            text: 'Walk away from this deal',
            nextNode: 'safe_ending',
            points: 30
          }
        ]
      },
      {
        id: 'demand_refund',
        text: 'He laughs: "The receipt says non-refundable. You agreed to terms and conditions." You never saw any terms. He threatens: "If you make trouble, I\'ll sue you for defamation."',
        choices: [
          {
            text: 'Back down - he seems powerful',
            nextNode: 'warning_ending',
            points: 0
          },
          {
            text: 'Report him to Consumer Protection Agency',
            nextNode: 'safe_ending',
            points: 30
          }
        ]
      },
      {
        id: 'verify_license',
        text: 'Ghana Immigration Service confirms: "This license is fake. Gulf Star Recruitment is not registered. This person is a criminal. File a police report immediately."',
        choices: [
          {
            text: 'File police report with all details',
            nextNode: 'safe_ending',
            points: 40
          },
          {
            text: 'Just avoid him - don\'t want trouble',
            nextNode: 'warning_ending',
            points: 10
          }
        ]
      },
      {
        id: 'confront_agent',
        text: 'You show him the Immigration Service website. He becomes aggressive: "That list is old! I know the Immigration Director personally! You\'re making a big mistake doubting me!" He tries to intimidate you.',
        choices: [
          {
            text: 'Stand firm and report him to police',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'Maybe I\'m wrong - apologize to him',
            nextNode: 'danger_convinced',
            points: -20
          }
        ]
      },
      {
        id: 'danger_convinced',
        text: 'You decide to trust him despite the warnings. You pay 8,000 cedis. He gives you a fake "Qatar work visa" - just a printed paper. At the airport, you are arrested for trying to use a forged visa. You face deportation and possible prosecution.',
        ending: true,
        outcome: 'danger',
        message: 'DANGER ENDING: You ignored official warnings and trusted a fraudster. You now face legal trouble and lost money. Always verify through official government channels. Never trust recruiters who are not on the official Ghana Immigration Service list.',
        points: -35
      },
      {
        id: 'threaten_report',
        text: 'He suddenly becomes nervous: "Okay, okay, forget it. Maybe this job isn\'t for you." He quickly leaves. Later, other market traders tell you he tried to scam them too.',
        choices: [
          {
            text: 'Report him to protect other traders',
            nextNode: 'safe_ending',
            points: 35
          },
          {
            text: 'He\'s gone - no need to do anything',
            nextNode: 'warning_ending',
            points: 10
          }
        ]
      },
      {
        id: 'warning_ending',
        text: 'You protected yourself but didn\'t stop the scammer. He will target other vulnerable traders. Reporting fraud is a community responsibility.',
        ending: true,
        outcome: 'warning',
        message: 'WARNING ENDING: You made some good choices but didn\'t finish the job. Reporting scammers to police (191) or the Trafficking Hotline (0800-100-100) prevents them from victimizing others in your community.',
        points: 10
      },
      {
        id: 'safe_ending',
        text: 'Perfect! You verified credentials through official channels, recognized red flags, and reported the fraud. The police can now investigate Mr. Yusif and warn other markets. You protected your community.',
        ending: true,
        outcome: 'safe',
        message: 'SAFE ENDING: Excellent work! You recognized: unlicensed recruiter, upfront fees, too-good-to-be-true salary, pressure tactics, and refusal to provide transparency. Always check the Ghana Immigration Service verified agency list at: immigration.gov.gh before paying any recruiter.',
        points: 45
      }
    ]
  }
];

// Helper function to get scenario by ID
export const getScenarioById = (id) => {
  return scenarios.find(scenario => scenario.id === id);
};

// Helper function to get all scenarios
export const getAllScenarios = () => {
  return scenarios;
};
