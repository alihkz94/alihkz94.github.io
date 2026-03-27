---
layout: page
title: Research
---

My work spans six interconnected areas of computational biology, ranging from environmental genomics to clinical cancer research.

---

### Metabarcoding and metagenomics

Environmental DNA profiling of microbial and eukaryotic communities using amplicon-based and shotgun sequencing approaches. Core work involves [PipeCraft2](https://github.com/pipecraft2/pipecraft) — a fully containerized, Nextflow-based pipeline supporting end-to-end metabarcoding analysis from raw reads to community tables. The [EUKARYOME](https://eukaryome.org/) database provides the taxonomic backbone for identification across all eukaryotic domains, supporting environmental monitoring and biodiversity studies.

### Long-read amplicon quality control

Systematic development and benchmarking of quality control workflows for PacBio and Oxford Nanopore long-read amplicon data. This includes evaluating read filtering strategies, denoising approaches, and their downstream effects on community composition estimates across diverse marker genes and ecosystem types.

### Chimera detection benchmarking

Comparative evaluation of chimera detection algorithms for long-read amplicons, resolving which approaches minimize false chimeras while preserving true biological signal. This work was published in *PeerJ* (2025) and provides practical guidance for researchers choosing QC tools for Nanopore and PacBio amplicon datasets.

### Single-cell and transcriptomic analysis

scRNA-seq and CROP-seq workflows for cancer research, integrating CRISPR screens with transcriptional profiling. Applied ML frameworks (scVI, TensorFlow, PyTorch) for cell-type annotation, trajectory inference, CNV detection, and clonal evolution modeling at single-cell resolution. Bulk RNA-seq differential expression analysis using DESeq2, edgeR, and MAST, alongside development of the DEASS statistical method for improved power in multi-group experimental designs.

### Pipeline development

Designing reproducible, containerized bioinformatics workflows using Nextflow and Snakemake with Docker and Singularity. Deployable on HPC clusters (SLURM) and cloud environments (AWS), ensuring portability and scalability across research infrastructures. New module development and maintenance for the PipeCraft2 platform.

### Environmental genomics (TREC)

The [TREC](https://www.embl.org/about/info/trec/) (Traversing European Coastlines) project is a large-scale international initiative sampling marine and coastal environments across Europe to characterize microbial and eukaryotic biodiversity. This work spans multiple countries, sequencing platforms, and bioinformatic workflows to build a continental-scale picture of coastal ecosystem health and community dynamics.
