import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

export default function BiDataSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="BI & Data Solutions"
      headline="Turn your data into"
      headlineAccent="boardroom decisions."
      subheadline='"Business intelligence built on real data infrastructure — not spreadsheets dressed up as dashboards."'
      description="Innovation Next designs and delivers business intelligence platforms, data warehouses, and big data pipelines for financial institutions, government ministries, and enterprises. From raw data ingestion to executive reporting — we make your data actually work."
      accentColor="#f59e0b"
      icon="📊"
      stats={[
        { value: '50+', label: 'Dashboards deployed' },
        { value: 'Real-time', label: 'Data pipeline capability' },
        { value: '5TB+', label: 'Data under management' },
        { value: 'Multi-cloud', label: 'AWS / Azure / GCP certified' },
      ]}
      features={[
        {
          title: 'BI Dashboards & Reporting',
          description: 'Executive, operational, and regulatory dashboards built in Power BI, Tableau, or custom React — connected live to your data sources.',
        },
        {
          title: 'Data Warehousing',
          description: 'Cloud data warehouse design and build on Snowflake, BigQuery, Redshift, or Azure Synapse — structured for analytics-first querying.',
        },
        {
          title: 'Data Engineering & ETL',
          description: 'End-to-end data pipeline engineering — ingestion, transformation, orchestration, and delivery using Spark, Airflow, dbt, and Kafka.',
        },
        {
          title: 'Big Data Infrastructure',
          description: 'High-volume data architecture for payment networks, government registries, and telecoms — capable of billions of events per day.',
        },
        {
          title: 'Master Data Management',
          description: 'Unified data model governance across siloed systems — customer master, product master, and reference data consolidation.',
        },
        {
          title: 'Data Governance & Quality',
          description: 'Data cataloguing, lineage tracking, quality rules, and governance frameworks — ensuring your data is trustworthy and auditable.',
        },
      ]}
      capabilities={[
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
      ]}
    />
  )
}
