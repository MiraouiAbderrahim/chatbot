import React, { useEffect, useState } from 'react';

function Chatbot({ user }) {
    useEffect(() => {
        console.log('user', user);
    }, [user]);
    const gender = user?.gender?.toLowerCase() || 'inconnu';

    const [step, setStep] = useState('weight');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [response, setResponse] = useState('');
    const [bmi, setBmi] = useState(null);
    const [advice, setAdvice] = useState('');
    const [links, setLinks] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 'weight') {
            setStep('height');
            setResponse('Veuillez entrer votre taille en mètres');
        } else if (step === 'height') {
            const bmiValue = (weight / (height * height)).toFixed(2);
            setBmi(bmiValue);

            let adviceText = '';
            let resourceLinks = [];

            if (bmiValue < 18.5) {
                adviceText = 'Vous êtes en insuffisance pondérale. ';
                adviceText += (gender === 'male')
                    ? 'Les hommes en insuffisance pondérale devraient augmenter leur apport calorique avec des aliments riches en protéines et faire de la musculation.'
                    : (gender === 'female')
                        ? 'Les femmes en insuffisance pondérale devraient se concentrer sur des aliments riches en nutriments et pratiquer une activité physique légère pour prendre du poids sainement.'
                        : 'Veuillez consulter un nutritionniste pour un conseil personnalisé.';

                resourceLinks = [
                    { label: 'Guide sur la prise de poids', url: 'https://www.santepubliquefrance.fr/prendre-du-poids' },
                    { label: 'Alimentation pour la prise de masse musculaire', url: 'https://www.nutrimuscle.com/conseils/prise-masse' }
                ];
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                adviceText = 'Votre poids est normal. ';
                adviceText += (gender === 'male')
                    ? 'Les hommes peuvent maintenir leur poids avec des activités physiques régulières comme la musculation et le cardio.'
                    : (gender === 'female')
                        ? 'Les femmes peuvent maintenir leur poids avec une alimentation équilibrée et des activités comme le yoga, la natation ou la marche.'
                        : 'Veuillez consulter un nutritionniste pour un conseil personnalisé.';

                resourceLinks = [
                    { label: 'Conseils pour maintenir un poids sain', url: 'https://www.ameli.fr/assure/sante/themes/surpoids-obesite/conseils' },
                    { label: 'Activités physiques recommandées', url: 'https://www.mangerbouger.fr/bouger-plus/activites-physiques' }
                ];
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                adviceText = 'Vous êtes en surpoids. ';
                adviceText += (gender === 'male')
                    ? 'Les hommes peuvent réduire leur apport calorique et faire des exercices de cardio comme la course ou la natation.'
                    : (gender === 'female')
                        ? 'Les femmes peuvent se concentrer sur le contrôle des portions et faire des exercices de cardio réguliers comme l’aérobic ou la marche.'
                        : 'Veuillez consulter un nutritionniste pour un conseil personnalisé.';

                resourceLinks = [
                    { label: 'Programme alimentaire pour perdre du poids', url: 'https://www.passeportsante.net/fr/Nutrition/Dietes/Fiche.aspx?doc=perdre-poids' },
                    { label: 'Sports recommandés pour la perte de poids', url: 'https://www.coachmagazine.fr/les-meilleurs-sports-pour-perdre-du-poids/' }
                ];
            } else {
                adviceText = 'Vous êtes obèse. ';
                adviceText += (gender === 'male')
                    ? 'Un plan diététique structuré et des exercices réguliers, comme la natation ou l’aérobic, sont recommandés pour les hommes.'
                    : (gender === 'female')
                        ? 'Les femmes devraient suivre un régime alimentaire sain et envisager des exercices à faible impact comme la marche ou le vélo pour réduire progressivement leur poids.'
                        : 'Veuillez consulter un nutritionniste pour un conseil personnalisé.';

                resourceLinks = [
                    { label: 'Conseils pour réduire l’obésité', url: 'https://www.obesite-sante.com/conseils-pour-perdre-du-poids' },
                    { label: 'Sports pour lutter contre l’obésité', url: 'https://www.sport-et-obesite.com/sport-reduction-obesite' }
                ];
            }

            setResponse(`Votre IMC est : ${bmiValue}`);
            setAdvice(adviceText);
            setLinks(resourceLinks);
            setStep('completed');
        }
    };

    const handleRestart = () => {
        setStep('weight');
        setWeight('');
        setHeight('');
        setResponse('');
        setBmi(null);
        setAdvice('');
        setLinks([]);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8"> {/* Increased column width for a larger view */}
                    <h2 className="text-center"></h2>

                    {step === 'weight' && (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label className="form-label">Entrez votre poids (kg) :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Entrez votre poids en kg"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Soumettre</button>
                        </form>
                    )}

                    {step === 'height' && (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label className="form-label">Entrez votre taille (mètres) :</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="Entrez votre taille en mètres"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Soumettre</button>
                        </form>
                    )}

                    {step === 'completed' && (
                        <div className="text-center mt-3">
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{response}</p> {/* Larger text */}
                            {advice && <p style={{ fontSize: '1.2rem' }}>{advice}</p>} {/* Slightly larger text */}
                            {links.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: '1.3rem' }}>Ressources recommandées :</h4> {/* Emphasized links */}
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {links.map((link, index) => (
                                            <li key={index} style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button onClick={handleRestart} className="btn btn-secondary mt-3">Recommencer</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
