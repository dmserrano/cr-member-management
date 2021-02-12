module.exports = {
    baseUrl: process.env.NODE_ENV === "production"
        ? "/cr-member-management/"
        : "/",

    outputDir: "docs",

    title: "CR Member Management"
};