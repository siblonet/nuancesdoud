const NafigatioTo = async (where, who = null) => {
    if (isClient) {
        const ActiveDasboard = document.getElementById('ActiveDasboard');
        const ActiveAttentes = document.getElementById('ActiveAttentes');
        const ActiveEncours = document.getElementById('ActiveEncours');
        const ActiveEffectue = document.getElementById('ActiveEffectue');
        const ActiveEchoue = document.getElementById('ActiveEchoue');

        const adminiSpace = document.getElementById('main-content');
        adminiSpace.innerHTML = '';

        if (where === "ActiveDasboard") {
            DashBoad(ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue, adminiSpace);
        } else if (where) {
            Commandes(where, ActiveDasboard, ActiveAttentes, ActiveEncours, ActiveEffectue, ActiveEchoue, adminiSpace);
        }
    }
}
