import Link from "next/link"
import { Clock, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Clock className="w-8 h-8 text-primary" />
              <span className="font-serif text-xl font-bold text-foreground">
                TimeTravel
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre passerelle vers les plus grandes époques de l{"'"}histoire.
              Voyagez en toute sécurité avec les pionniers du tourisme temporel.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/destinations/egypte-ancienne"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Égypte Ancienne
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/europe-medievale"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Europe Médiévale
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/renaissance-italienne"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Renaissance Italienne
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Notre agence
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>42 Rue du Continuum, Paris</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@timetravel.agency</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2089 TimeTravel Agency. Tous droits réservés à travers toutes les époques.
          </p>
        </div>
      </div>
    </footer>
  )
}
