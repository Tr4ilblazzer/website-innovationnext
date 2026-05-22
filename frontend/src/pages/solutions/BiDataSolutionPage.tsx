import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '50+', label: 'Dashboards deployed' },
  { value: 'Real-time', label: 'Data pipeline capability' },
  { value: '5TB+', label: 'Data under management' },
  { value: 'Multi-cloud', label: 'AWS / Azure / GCP certified' },
]

const features = [
  { title: 'BI Dashboards & Reporting', desc: 'Executive, operational, and regulatory dashboards built in Power BI, Tableau, or custom React — connected live to your data sources.' },
  { title: 'Data Warehousing', desc: 'Cloud data warehouse design and build on Snowflake, BigQuery, Redshift, or Azure Synapse — structured for analytics-first querying.' },
  { title: 'Data Engineering & ETL', desc: 'End-to-end data pipeline engineering — ingestion, transformation, orchestration, and delivery using Spark, Airflow, dbt, and Kafka.' },
  { title: 'Big Data Infrastructure', desc: 'High-volume data architecture for payment networks, government registries, and telecoms — capable of billions of events per day.' },
  { title: 'Master Data Management', desc: 'Unified data model governance across siloed systems — customer master, product master, and reference data consolidation.' },
  { title: 'Data Governance & Quality', desc: 'Data cataloguing, lineage tracking, quality rules, and governance frameworks — ensuring your data is trustworthy and auditable.' },
]

const capabilities = [
  'Power BI / Tableau / Metabase',
  'Snowflake / BigQuery / Redshift',
  'Apache Spark / Kafka / Flink',
  'dbt / Airflow / Prefect',
  'Python / SQL / Scala',
  'AWS Glue / Azure Data Factory',
  'Real-time streaming pipelines',
  'Data lake architecture',
  'GDPR / data privacy compliance',
  'Self-service analytics enablement',
  'Embedded analytics (React)',
  'Regulatory reporting automation',
]

export default function BiDataSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="BI & Data Solutions"
      headline="Turn your data into"
      headlineAccent="boardroom decisions."
      quote="Business intelligence built on real data infrastructure — not spreadsheets dressed up as dashboards."
      description="Innovation Next designs and delivers business intelligence platforms, data warehouses, and big data pipelines for financial institutions, government ministries, and enterprises. From raw data ingestion to executive reporting — we make your data actually work."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
      heroImageAlt="Business intelligence and data"
      stats={stats}
      featuresSubheadline="Every pipeline and dashboard has been deployed against live enterprise and government data — not sample datasets."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, live systems — not in proof-of-concept environments."
      capabilities={capabilities}
      insightsCategory="BI & Data"
    />
  )
}
