import { PageHero } from '../components/ui'
import { EVENT } from '../lib/data'
import { useTitle } from '../lib/util'

const Draft = () => (
  <p className="mb-10 border-l-2 border-crimson bg-white p-5 text-base text-text">
    Draft for the Organising Board. Items marked “to decide” need an answer, and the final text should be checked by someone who knows Serbian data protection law before launch.
  </p>
)
const body = 'wrap max-w-4xl py-20 md:py-28 lede [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-ink'

export function Privacy() {
  useTitle('Privacy')
  return (
    <>
      <PageHero eyebrow="Privacy" lines={['Privacy notice']} intro="What we collect when you apply or write to us, why, and what you can ask us to do with it." />
      <article className="on-light bg-paper">
        <div className={body}>
          <Draft />
          <h2>Who we are</h2>
          <p>The Belgrade Diplomacy &amp; Business Conference (BDBC) is a youth conference run by a volunteer Organising Board in Belgrade, Serbia. You can reach us at {EVENT.email}.</p>
          <h2>What we collect</h2>
          <p>When you apply: your full name, date of birth, email, phone number, country and city, social media handles, level of education and institution, past conference experience, committee and country preferences, dietary requirements, your reasons for applying, and your chosen payment method. When you use the contact form: your name, email and message.</p>
          <h2>Why we collect it</h2>
          <p>To review applications and assign committees and countries, to send payment instructions and confirmations, to plan catering, to issue certificates, and to answer your questions. We do not sell your data or use it for advertising.</p>
          <h2>Where it is kept</h2>
          <p>Applications are stored in a Google Sheet and emails are sent from a Google account, so Google processes this data on our behalf. Only the Organising Board, and committee chairs for the delegates in their committee, can see applications.</p>
          <h2>How long we keep it</h2>
          <p>To decide: for example, until the end of the following edition, after which applications are deleted.</p>
          <h2>Delegates under 18</h2>
          <p>To decide: whether applicants under 18 need a parent or guardian’s consent, and how that consent is collected.</p>
          <h2>Photos</h2>
          <p>We photograph the conference and publish some photos on this website and our social media. If you would rather not appear, tell the registration desk or write to us.</p>
          <h2>Your rights</h2>
          <p>You can ask to see the data we hold about you, correct it, or have it deleted, by writing to {EVENT.email}.</p>
        </div>
      </article>
    </>
  )
}

export function Terms() {
  useTitle('Terms')
  return (
    <>
      <PageHero eyebrow="Terms" lines={['Terms of', 'participation']} intro="The conditions of taking part in BDBC 2027." />
      <article className="on-light bg-paper">
        <div className={body}>
          <Draft />
          <h2>Applying</h2>
          <p>Sending an application does not guarantee a seat. Committees and countries are assigned by the Organising Board, using your preferences where possible. Applications close 7 days before the conference.</p>
          <h2>Fee</h2>
          <p>The fee is €45 if paid in advance by bank transfer, or €50 in cash on the first day. A seat is confirmed when the transfer arrives. 100% of the conference proceeds go to humanitarian causes.</p>
          <h2>Refunds</h2>
          <p>To decide: whether fees are refunded if a delegate cancels, and until when.</p>
          <h2>Conduct</h2>
          <p>Delegates follow the rules of procedure and the instructions of their chairs, and treat other delegates, staff and venues with respect.</p>
          <h2>Changes</h2>
          <p>Dates, venue and the timetable may change. We will tell delegates by email as early as we can.</p>
          <h2>Contact</h2>
          <p>Questions about these terms: {EVENT.email}.</p>
        </div>
      </article>
    </>
  )
}
