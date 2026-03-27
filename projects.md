---
layout: page
title: Projects
---

#### PipeCraft2

🏦 pipecraft2 organization · University of Tartu
🛠️ Nextflow · Docker · Singularity · Python · R
🔗 [github.com/pipecraft2/pipecraft](https://github.com/pipecraft2/pipecraft)

A modular, containerized pipeline for metabarcoding and amplicon sequencing data analysis. Supports end-to-end processing from raw reads to community tables, deployable on HPC clusters and cloud environments. I contribute new module development and maintain existing workflows.

---

#### EUKARYOME

🏦 University of Tartu · Tedersoo Lab
🛠️ Bioinformatics · Phylogenetics · Database curation
🔗 [eukaryome.org](https://eukaryome.org/)

A comprehensive rRNA gene reference database for the identification of all eukaryotic taxa. Enables environmental DNA classification across microbiome and ecological studies. Published in *Database (Oxford)* (2024).

---

#### SnakeEUK

🏦 University of Tartu
🛠️ Snakemake · Python · Biopython · SeqKit
🔗 [github.com/alihkz94/SnakeEUK](https://github.com/alihkz94/SnakeEUK)

A Snakemake pipeline for processing and reformatting eukaryotic rRNA reference sequences (e.g. EUKARYOME) into multiple tool-specific formats: DADA2, QIIME2, SINTAX, Mothur, and a general rank-prefixed format. Handles encoding conversion (latin-1 to ASCII), taxonomy header normalization, placeholder cleaning, and incomplete taxonomic assignments to ensure compatibility across downstream classifiers.

---

#### DEASS

🏦 University of Tartu
🛠️ R · RNA-seq · Statistical method development

A statistical method for differential expression analysis in RNA-seq data, designed to improve power and reduce false discovery rates in multi-group comparisons with complex experimental designs.

---

#### Long-read chimera detection benchmarking

🏦 University of Tartu
🛠️ Python · R · PacBio · Oxford Nanopore
🔗 [doi:10.7717/peerj.20456](https://peerj.com/articles/20456/)

Systematic evaluation of chimera detection algorithms for PacBio and Oxford Nanopore long-read amplicon data. Revealed high false-positive rates across algorithms, showing that commonly used tools discard substantial amounts of genuine sequences during quality filtering.

---

#### TREC — Traversing European Coastlines

🏦 EMBL · University of Tartu · International consortium
🛠️ Metabarcoding · Metagenomics · Sampling
🔗 [embl.org/about/info/trec](https://www.embl.org/about/info/trec/)

An international biodiversity sampling initiative spanning European coastlines to characterize marine and coastal microbial and eukaryotic communities. I participate in the bioinformatics analysis of metabarcoding datasets generated across multiple countries and sequencing platforms.

---

#### Single-cell genomics (cancer)

🏦 Imam Khomeini Hospital, Tehran
🛠️ scRNA-seq · CROP-seq · scVI · TensorFlow · PyTorch · R · Python

Integrative single-cell analysis of cancer samples using 10X Chromium scRNA-seq and CROP-seq libraries. Applied ML models for clonal evolution, CNV detection, and gene set enrichment, alongside whole-genome and whole-exome sequencing pipelines using Nvidia Parabricks.
