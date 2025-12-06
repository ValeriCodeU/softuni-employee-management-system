export const fromIsoDate = (isoDate) => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return formattedDate;
}