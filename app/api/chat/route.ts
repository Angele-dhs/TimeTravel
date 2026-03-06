import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant IA de TimeTravel, une agence de voyages dans le temps futuriste et premium.

Contexte de l'entreprise :
- TimeTravel propose des voyages temporels vers des époques historiques fascinantes
- Destinations actuelles : Égypte Ancienne (2500 av. J.-C.), Europe Médiévale (1200 ap. J.-C.), Renaissance Italienne (1500 ap. J.-C.)
- Prix : entre 9 800€ et 12 500€ selon la destination et la durée
- Durée des voyages : 5 à 7 jours selon la destination
- Grâce à la technologie de compression temporelle, les voyageurs peuvent passer une semaine dans le passé et revenir seulement quelques heures après leur départ
- Taux de retour sécurisé : 99.9%
- Chaque voyageur est accompagné d'un guide expert formé aux protocoles d'urgence, équipé d'un dispositif de rappel instantané
- Des costumes d'époque authentiques sont fournis et inclus dans le prix
- Acompte de 30% à la réservation, annulation gratuite jusqu'à 30 jours avant le départ
- Le prix comprend : transport temporel, hébergement d'époque, repas, costumes, guide expert

Ton rôle :
- Répondre aux questions des visiteurs de manière chaleureuse, enthousiaste et professionnelle
- Guider les visiteurs dans leur choix de destination et les aider à réserver
- Rassurer sur la sécurité des voyages temporels
- Utiliser un ton amical mais professionnel, avec une touche d'émerveillement pour le voyage dans le temps
- Répondre en français
- Garder des réponses concises (2-4 phrases max) sauf si le visiteur demande plus de détails
- Si une question sort du cadre de TimeTravel, rediriger poliment vers les sujets liés aux voyages temporels

Ne jamais :
- Inventer des informations qui ne sont pas dans le contexte ci-dessus
- Promettre des destinations ou services non listés
- Minimiser les risques ou garantir un taux de retour de 100%`;

// Groq API configuration
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // Fallback mode: if no API key, use a simple local response
      return NextResponse.json({
        content: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true,
      });
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", response.status, errorData);

      // On API error, fall back to local responses
      return NextResponse.json({
        content: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true,
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({
        content: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true,
      });
    }

    return NextResponse.json({ content, fallback: false });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

// Fallback responses when no API key is configured
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("prix") || lowerMessage.includes("cout") || lowerMessage.includes("tarif") || lowerMessage.includes("combien")) {
    return "Nos voyages varient entre 9 800€ et 12 500€ selon la destination et la durée. Ce prix comprend le transport temporel, l'hébergement d'époque, les repas, les costumes et un guide expert. 🕰️";
  }
  if (lowerMessage.includes("securite") || lowerMessage.includes("sécurité") || lowerMessage.includes("danger") || lowerMessage.includes("risque") || lowerMessage.includes("sûr")) {
    return "Votre sécurité est notre priorité absolue ! Notre technologie a un taux de retour de 99.9%. Vous êtes accompagné d'un guide formé aux protocoles d'urgence et équipé d'un dispositif de rappel instantané. 🛡️";
  }
  if (lowerMessage.includes("destination") || lowerMessage.includes("epoque") || lowerMessage.includes("époque") || lowerMessage.includes("egypte") || lowerMessage.includes("medieval") || lowerMessage.includes("renaissance")) {
    return "Nous proposons 3 destinations extraordinaires : l'Égypte Ancienne (2500 av. J.-C.) 🏛️, l'Europe Médiévale (1200 ap. J.-C.) ⚔️ et la Renaissance Italienne (1500 ap. J.-C.) 🎨. Laquelle vous fait rêver ?";
  }
  if (lowerMessage.includes("reserver") || lowerMessage.includes("réserver") || lowerMessage.includes("reservation") || lowerMessage.includes("réservation") || lowerMessage.includes("annul")) {
    return "Pour réserver, sélectionnez votre destination, choisissez vos dates et remplissez le formulaire. Un acompte de 30% est demandé. Annulation gratuite jusqu'à 30 jours avant le départ ! 📅";
  }
  if (lowerMessage.includes("duree") || lowerMessage.includes("durée") || lowerMessage.includes("combien de temps") || lowerMessage.includes("jours")) {
    return "Nos voyages durent entre 5 et 7 jours selon la destination. Et grâce à notre technologie de compression temporelle, vous revenez seulement quelques heures après votre départ ! ⏳";
  }
  if (lowerMessage.includes("vetement") || lowerMessage.includes("vêtement") || lowerMessage.includes("emporter") || lowerMessage.includes("valise") || lowerMessage.includes("costume")) {
    return "Des costumes d'époque authentiques sont fournis et inclus dans le prix ! Nous vous conseillons d'apporter des sous-vêtements confortables et vos médicaments personnels. 👗";
  }
  if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("hello") || lowerMessage.includes("bonsoir")) {
    return "Bonjour et bienvenue chez TimeTravel ! 🌟 Je suis ravi de vous accueillir. Vous rêvez de découvrir l'Égypte des pharaons, le Moyen Âge ou la Renaissance ? Je suis là pour vous guider !";
  }
  if (lowerMessage.includes("merci") || lowerMessage.includes("super") || lowerMessage.includes("genial") || lowerMessage.includes("parfait")) {
    return "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. Nous sommes impatients de vous faire voyager dans le temps !";
  }

  return "Je suis votre assistant TimeTravel ! 🤖 Je peux vous renseigner sur nos destinations (Égypte, Moyen Âge, Renaissance), les prix, la sécurité, les réservations ou encore ce qu'il faut emporter. Que souhaitez-vous savoir ?";
}
