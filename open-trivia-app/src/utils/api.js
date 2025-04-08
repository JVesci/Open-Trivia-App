export async function fetchTriviaQuestion({ category, difficulty }) {
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.response_code !== 0) throw new Error('API error');
    return data.results[0];
}